import express from 'express';
import puppeteer from 'puppeteer';
import User from '../../models/User.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Handle preflight OPTIONS requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

/**
 * @route   POST /api/integrations/linkedin/test
 * @desc    Test LinkedIn data sync (no auth required for testing)
 * @access  Public
 */
router.post('/test', [
  body('profileUrl')
    .isURL()
    .withMessage('Please provide a valid LinkedIn profile URL')
    .matches(/linkedin\.com\/in\//)
    .withMessage('URL must be a LinkedIn profile URL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { profileUrl } = req.body;
    console.log('🧪 Test LinkedIn sync for URL:', profileUrl);

    // Simple test response without actual scraping
    res.json({
      success: true,
      message: 'LinkedIn test endpoint working',
      data: {
        profileUrl: profileUrl,
        testMode: true,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('LinkedIn test error:', error);
    res.status(500).json({
      success: false,
      message: 'Test endpoint error'
    });
  }
});

/**
 * @route   POST /api/integrations/linkedin/sync
 * @desc    Sync LinkedIn data using URL (puppeteer scraping)
 * @access  Private
 */
router.post('/sync', [
  body('profileUrl')
    .isURL()
    .withMessage('Please provide a valid LinkedIn profile URL')
    .matches(/linkedin\.com\/in\//)
    .withMessage('URL must be a LinkedIn profile URL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { profileUrl } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    try {
      // Navigate to LinkedIn profile
      await page.goto(profileUrl, { 
        waitUntil: 'networkidle2',
        timeout: parseInt(process.env.LINKEDIN_SCRAPER_TIMEOUT) || 30000
      });

      // Wait for page to load
      await page.waitForTimeout(3000);

      // Extract profile data
      const profileData = await page.evaluate(() => {
        const data = {
          profile: {},
          experience: [],
          education: [],
          skills: [],
          certifications: []
        };

        try {
          // Basic profile information
          const nameElement = document.querySelector('h1.text-heading-xlarge');
          data.profile.name = nameElement ? nameElement.textContent.trim() : '';

          const headlineElement = document.querySelector('.text-body-medium.break-words');
          data.profile.headline = headlineElement ? headlineElement.textContent.trim() : '';

          const profilePictureElement = document.querySelector('.pv-top-card-profile-picture__image img');
          data.profile.profilePicture = profilePictureElement ? profilePictureElement.src : '';

          const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
          data.profile.location = locationElement ? locationElement.textContent.trim() : '';

          // Connection count
          const connectionElement = document.querySelector('.t-black--light.t-normal span');
          data.profile.connectionCount = connectionElement ? connectionElement.textContent.trim() : '';

          // Experience section
          const experienceSection = document.querySelector('#experience');
          if (experienceSection) {
            const experienceItems = experienceSection.closest('.pvs-list__outer-container')?.querySelectorAll('.pvs-list__paged-list-item');
            
            experienceItems?.forEach((item, index) => {
              if (index < 10) { // Limit to 10 experiences
                const experience = {};
                
                const titleElement = item.querySelector('.mr1.t-bold span[aria-hidden="true"]');
                experience.title = titleElement ? titleElement.textContent.trim() : '';

                const companyElement = item.querySelector('.t-14.t-normal span[aria-hidden="true"]');
                experience.company = companyElement ? companyElement.textContent.trim() : '';

                const durationElement = item.querySelector('.t-14.t-normal.t-black--light span[aria-hidden="true"]');
                experience.duration = durationElement ? durationElement.textContent.trim() : '';

                const locationElement = item.querySelector('.t-12.t-black--light.t-normal span[aria-hidden="true"]');
                experience.location = locationElement ? locationElement.textContent.trim() : '';

                // Try to extract start and end dates
                const durationText = experience.duration;
                if (durationText) {
                  const dateMatch = durationText.match(/(\w+ \d{4})\s*[-–]\s*(\w+ \d{4}|Present)/);
                  if (dateMatch) {
                    experience.startDate = dateMatch[1];
                    experience.endDate = dateMatch[2];
                  }
                }

                if (experience.title && experience.company) {
                  data.experience.push(experience);
                }
              }
            });
          }

          // Education section
          const educationSection = document.querySelector('#education');
          if (educationSection) {
            const educationItems = educationSection.closest('.pvs-list__outer-container')?.querySelectorAll('.pvs-list__paged-list-item');
            
            educationItems?.forEach((item, index) => {
              if (index < 5) { // Limit to 5 education entries
                const education = {};
                
                const institutionElement = item.querySelector('.mr1.t-bold span[aria-hidden="true"]');
                education.institution = institutionElement ? institutionElement.textContent.trim() : '';

                const degreeElement = item.querySelector('.t-14.t-normal span[aria-hidden="true"]');
                education.degree = degreeElement ? degreeElement.textContent.trim() : '';

                const durationElement = item.querySelector('.t-14.t-normal.t-black--light span[aria-hidden="true"]');
                if (durationElement) {
                  const durationText = durationElement.textContent.trim();
                  const dateMatch = durationText.match(/(\d{4})\s*[-–]\s*(\d{4})/);
                  if (dateMatch) {
                    education.startDate = dateMatch[1];
                    education.endDate = dateMatch[2];
                  }
                }

                if (education.institution) {
                  data.education.push(education);
                }
              }
            });
          }

          // Skills section
          const skillsSection = document.querySelector('#skills');
          if (skillsSection) {
            const skillItems = skillsSection.closest('.pvs-list__outer-container')?.querySelectorAll('.mr1.t-bold span[aria-hidden="true"]');
            
            skillItems?.forEach((item, index) => {
              if (index < 20) { // Limit to 20 skills
                const skillName = item.textContent.trim();
                if (skillName) {
                  data.skills.push({
                    name: skillName,
                    endorsements: 0 // We can't easily get endorsement count from public view
                  });
                }
              }
            });
          }

          // About/Summary section
          const aboutSection = document.querySelector('#about');
          if (aboutSection) {
            const summaryElement = aboutSection.closest('.pv-shared-text-with-see-more')?.querySelector('.full-width.t-14.t-normal.t-black.display-flex span[aria-hidden="true"]');
            data.profile.summary = summaryElement ? summaryElement.textContent.trim() : '';
          }

        } catch (error) {
          console.error('Error extracting LinkedIn data:', error);
        }

        return data;
      });

      await browser.close();

      // Update user's LinkedIn integration data
      user.linkedinIntegration = {
        isConnected: true,
        profileUrl: profileUrl,
        profile: {
          name: profileData.profile.name || user.name,
          headline: profileData.profile.headline || '',
          profilePicture: profileData.profile.profilePicture || '',
          location: profileData.profile.location || '',
          summary: profileData.profile.summary || '',
          connectionCount: profileData.profile.connectionCount || ''
        },
        experience: profileData.experience.map(exp => ({
          title: exp.title || '',
          company: exp.company || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          duration: exp.duration || '',
          description: '',
          employmentType: ''
        })),
        education: profileData.education.map(edu => ({
          institution: edu.institution || '',
          degree: edu.degree || '',
          fieldOfStudy: '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          description: ''
        })),
        skills: profileData.skills.map(skill => ({
          name: skill.name,
          endorsements: skill.endorsements || 0,
          endorsedBy: []
        })),
        certifications: [], // Would need additional scraping for certifications
        languages: [], // Would need additional scraping for languages
        lastSynced: new Date()
      };

      // Update social links if not already set
      if (!user.socialLinks.linkedin) {
        user.socialLinks.linkedin = profileUrl;
      }

      // Update profile picture if not already set and LinkedIn has one
      if (!user.avatar && profileData.profile.profilePicture) {
        user.avatar = profileData.profile.profilePicture;
      }

      // Update bio if not already set and LinkedIn has headline
      if (!user.bio && profileData.profile.headline) {
        user.bio = profileData.profile.headline;
      }

      await user.save();

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, parseInt(process.env.LINKEDIN_RATE_LIMIT_DELAY) || 2000));

      res.json({
        success: true,
        message: 'LinkedIn data synced successfully',
        data: {
          profile: user.linkedinIntegration.profile,
          experienceCount: user.linkedinIntegration.experience.length,
          educationCount: user.linkedinIntegration.education.length,
          skillsCount: user.linkedinIntegration.skills.length
        }
      });

    } catch (error) {
      await browser.close();
      throw error;
    }

  } catch (error) {
    console.error('LinkedIn sync error:', error);

    // Handle specific errors
    if (error.message.includes('timeout')) {
      return res.status(408).json({
        success: false,
        message: 'LinkedIn profile loading timed out. Please try again.'
      });
    }

    if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid LinkedIn profile URL or network error.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to sync LinkedIn data. Please ensure the profile is public and try again.'
    });
  }
});

/**
 * @route   DELETE /api/integrations/linkedin/disconnect
 * @desc    Disconnect LinkedIn integration
 * @access  Private
 */
router.delete('/disconnect', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Reset LinkedIn integration
    user.linkedinIntegration = {
      isConnected: false,
      profileUrl: null,
      profile: {},
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      languages: [],
      lastSynced: null
    };

    await user.save();

    res.json({
      success: true,
      message: 'LinkedIn integration disconnected successfully'
    });
  } catch (error) {
    console.error('LinkedIn disconnect error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disconnect LinkedIn integration'
    });
  }
});

/**
 * @route   GET /api/integrations/linkedin/status
 * @desc    Get LinkedIn integration status
 * @access  Private
 */
router.get('/status', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        isConnected: user.linkedinIntegration.isConnected,
        profileUrl: user.linkedinIntegration.profileUrl,
        lastSynced: user.linkedinIntegration.lastSynced,
        profile: user.linkedinIntegration.profile,
        experienceCount: user.linkedinIntegration.experience.length,
        educationCount: user.linkedinIntegration.education.length,
        skillsCount: user.linkedinIntegration.skills.length
      }
    });
  } catch (error) {
    console.error('LinkedIn status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get LinkedIn status'
    });
  }
});

/**
 * @route   POST /api/integrations/linkedin/import-to-resume
 * @desc    Import LinkedIn data to resume builder
 * @access  Private
 */
router.post('/import-to-resume', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user || !user.linkedinIntegration.isConnected) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn account not connected'
      });
    }

    const linkedinData = user.linkedinIntegration;
    
    // Structure data for resume builder format
    const resumeData = {
      personalInfo: {
        name: linkedinData.profile.name || user.name,
        headline: linkedinData.profile.headline || '',
        location: linkedinData.profile.location || '',
        profilePicture: linkedinData.profile.profilePicture || user.avatar,
        summary: linkedinData.profile.summary || user.bio
      },
      experience: linkedinData.experience.map(exp => ({
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.endDate === 'Present',
        description: exp.description || '',
        achievements: []
      })),
      education: linkedinData.education.map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        startDate: edu.startDate,
        endDate: edu.endDate,
        gpa: '',
        description: edu.description || ''
      })),
      skills: linkedinData.skills.map(skill => ({
        name: skill.name,
        level: 'Intermediate', // Default level since we can't determine from LinkedIn
        category: 'Technical' // Default category
      })),
      certifications: linkedinData.certifications.map(cert => ({
        name: cert.name,
        issuer: cert.issuingOrganization,
        issueDate: cert.issueDate,
        expirationDate: cert.expirationDate,
        credentialId: cert.credentialId,
        url: cert.credentialUrl
      }))
    };

    res.json({
      success: true,
      message: 'LinkedIn data formatted for resume import',
      data: resumeData
    });
  } catch (error) {
    console.error('LinkedIn resume import error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import LinkedIn data to resume'
    });
  }
});

/**
 * @route   GET /api/integrations/linkedin/suggestions
 * @desc    Get resume improvement suggestions based on LinkedIn data
 * @access  Private
 */
router.get('/suggestions', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user || !user.linkedinIntegration.isConnected) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn account not connected'
      });
    }

    const suggestions = [];
    const linkedinData = user.linkedinIntegration;

    // Generate suggestions based on LinkedIn data
    if (linkedinData.profile.headline && !user.bio) {
      suggestions.push({
        type: 'profile',
        title: 'Update Your Bio',
        description: 'Consider adding your LinkedIn headline to your DevElevate bio',
        action: 'Add bio from LinkedIn headline',
        priority: 'high'
      });
    }

    if (linkedinData.experience.length > 0) {
      suggestions.push({
        type: 'experience',
        title: 'Import Work Experience',
        description: `You have ${linkedinData.experience.length} work experiences on LinkedIn that could enhance your resume`,
        action: 'Import to resume builder',
        priority: 'high'
      });
    }

    if (linkedinData.skills.length > 5) {
      suggestions.push({
        type: 'skills',
        title: 'Showcase Your Skills',
        description: `Import ${linkedinData.skills.length} skills from LinkedIn to strengthen your profile`,
        action: 'Add skills to profile',
        priority: 'medium'
      });
    }

    if (linkedinData.education.length > 0) {
      suggestions.push({
        type: 'education',
        title: 'Add Educational Background',
        description: 'Your LinkedIn education history can improve your resume completeness',
        action: 'Import education details',
        priority: 'medium'
      });
    }

    if (linkedinData.certifications.length > 0) {
      suggestions.push({
        type: 'certifications',
        title: 'Display Certifications',
        description: 'Show your professional certifications to potential employers',
        action: 'Import certifications',
        priority: 'low'
      });
    }

    res.json({
      success: true,
      data: {
        suggestions,
        totalSuggestions: suggestions.length,
        highPriority: suggestions.filter(s => s.priority === 'high').length
      }
    });
  } catch (error) {
    console.error('LinkedIn suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate LinkedIn suggestions'
    });
  }
});

export default router;
