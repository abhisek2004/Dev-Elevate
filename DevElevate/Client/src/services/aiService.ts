interface ExpenseData {
  category: string;
  amount: number;
}

interface QuizGenerationParams {
  topic: string;
  difficulty: string;
  type: string;
  questionCount: number;
}

interface GeneratedQuizResponse {
  title: string;
  topic: string;
  difficulty: string;
  type: string;
  questionCount: number;
  isAIGenerated: boolean;
  questions: unknown[]; // Backend will populate this - use unknown[] or define a proper Question interface
}

export class AIService {
  // Generate AI tags for notes
  static async generateTags(content: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const keywords = content.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !['the', 'and', 'for', 'with', 'this', 'that', 'have', 'will', 'from', 'they'].includes(word))
      .slice(0, 5);
    
    return keywords;
  }

  // Generate AI summary for notes
  static async summarizeText(content: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join('. ') + '.';
    
    return summary;
  }

  // Optimize budget with AI insights
  static async optimizeBudget(expenses: ExpenseData[]): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const highestCategory = expenses.reduce((max, exp) => 
      exp.amount > max.amount ? exp : max
    );
    
    let optimization = `Based on your spending patterns, here are some AI-powered insights:\n\n`;
    optimization += `• Total spending: $${totalSpent.toLocaleString()}\n`;
    optimization += `• Highest spending category: ${highestCategory.category} ($${highestCategory.amount.toLocaleString()})\n\n`;
    
    if (highestCategory.amount > totalSpent * 0.4) {
      optimization += `⚠️  ${highestCategory.category} represents over 40% of your total spending. Consider setting a stricter budget for this category.\n\n`;
    }
    
    optimization += `💡 Recommendations:\n`;
    optimization += `• Track daily expenses to identify small purchases that add up\n`;
    optimization += `• Set weekly spending limits for discretionary categories\n`;
    optimization += `• Review subscriptions and recurring payments monthly\n`;
    optimization += `• Consider using cash for categories where you tend to overspend`;
    
    return optimization;
  }

  // Generate AI Quiz
  static async generateQuiz(params: QuizGenerationParams): Promise<GeneratedQuizResponse> {
    // This would call your backend endpoint
    // The backend will use Gemini API to generate the quiz
    // For now, this is a placeholder that shows the expected structure
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example structure - actual implementation should call backend
    return {
      title: `${params.topic} - ${params.difficulty} Quiz`,
      topic: params.topic,
      difficulty: params.difficulty,
      type: params.type,
      questionCount: params.questionCount,
      isAIGenerated: true,
      questions: [] // Backend will populate this
    };
  }
}