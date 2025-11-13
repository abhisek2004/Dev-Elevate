export class AIService {
  static async summarizeText(content: string): Promise<string> {
    try {
      // Simple text summarization - you can replace with actual AI service
      const sentences = content.split('.').filter(s => s.trim().length > 0);
      const summary = sentences.slice(0, 2).join('.') + '.';
      return summary || 'Summary not available.';
    } catch (error) {
      console.error('Error summarizing text:', error);
      return 'Summary not available.';
    }
  }
}