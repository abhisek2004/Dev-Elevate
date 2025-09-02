export const aimlModules = {
  introduction: {
    id: 'introduction',
    title: 'AI/ML Introduction',
    description: 'Understand AI, ML, and Data Science fundamentals with real-world applications',
    topics: [
      {
        id: 'ai-basics',
        title: 'What is AI & Machine Learning?',
        content: `# Introduction to Artificial Intelligence & Machine Learning

## What is Artificial Intelligence (AI)?
**Artificial Intelligence** is the simulation of human intelligence in machines that are programmed to think and learn like humans.

### Types of AI:
1. **Narrow AI (Weak AI)** - Designed for specific tasks
   - Examples: Siri, Alexa, recommendation systems
2. **General AI (Strong AI)** - Human-level intelligence across all domains
   - Still theoretical, not yet achieved
3. **Super AI** - Surpasses human intelligence
   - Hypothetical future possibility

## What is Machine Learning (ML)?
**Machine Learning** is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

### Key Concepts:
- **Algorithm**: Set of rules for solving problems
- **Model**: Result of training an algorithm on data
- **Training**: Process of teaching the algorithm using data
- **Prediction**: Using the trained model on new data

## Types of Machine Learning

### 1. Supervised Learning
- **Definition**: Learning with labeled examples
- **Goal**: Predict outcomes for new data
- **Examples**: Email spam detection, image recognition
- **Types**:
  - **Classification**: Predicting categories (spam/not spam)
  - **Regression**: Predicting continuous values (house prices)

### 2. Unsupervised Learning
- **Definition**: Finding patterns in data without labels
- **Goal**: Discover hidden structures
- **Examples**: Customer segmentation, anomaly detection
- **Types**:
  - **Clustering**: Grouping similar data points
  - **Association**: Finding relationships between variables

### 3. Reinforcement Learning
- **Definition**: Learning through trial and error
- **Goal**: Maximize rewards through actions
- **Examples**: Game playing (AlphaGo), robotics
- **Components**: Agent, Environment, Actions, Rewards

## Real-World Applications

### Healthcare:
- **Medical Diagnosis**: AI analyzes medical images
- **Drug Discovery**: ML accelerates research
- **Personalized Treatment**: Tailored therapy recommendations

### Finance:
- **Fraud Detection**: Identifying suspicious transactions
- **Algorithmic Trading**: Automated investment decisions
- **Credit Scoring**: Assessing loan default risk

### Technology:
- **Search Engines**: Ranking and retrieving information
- **Recommendation Systems**: Netflix, Amazon suggestions
- **Natural Language Processing**: Translation, chatbots

### Transportation:
- **Autonomous Vehicles**: Self-driving cars
- **Route Optimization**: GPS navigation
- **Predictive Maintenance**: Vehicle servicing`,
        codeExample: `# Simple Machine Learning Example - Predicting House Prices
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Create sample house data
np.random.seed(42)
n_samples = 1000

house_data = {
    'size_sqft': np.random.normal(2000, 500, n_samples),
    'bedrooms': np.random.randint(1, 6, n_samples),
    'bathrooms': np.random.randint(1, 4, n_samples),
    'age_years': np.random.randint(0, 50, n_samples),
    'garage': np.random.choice([0, 1], n_samples)
}

df = pd.DataFrame(house_data)

# Generate price based on features
df['price'] = (
    df['size_sqft'] * 150 +
    df['bedrooms'] * 10000 +
    df['bathrooms'] * 15000 +
    (50 - df['age_years']) * 1000 +
    df['garage'] * 20000 +
    np.random.normal(0, 20000, n_samples)
)

print("=== House Price Prediction with Machine Learning ===")
print(f"Dataset shape: {df.shape}")
print("\\nFirst 5 rows:")
print(df.head())

# Prepare features and target
X = df[['size_sqft', 'bedrooms', 'bathrooms', 'age_years', 'garage']]
y = df['price']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\\nModel Performance:")
print(f"R² Score: {r2:.4f}")
print(f"Model explains {r2*100:.2f}% of price variation")

# Feature importance
print("\\nFeature Importance:")
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:,.2f} per unit")`,
        practiceLinks: [
          { name: 'Coursera ML Course', url: 'https://www.coursera.org/learn/machine-learning' },
          { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' },
          { name: 'Google AI Education', url: 'https://ai.google/education/' }
        ]
      },
      {
        id: 'data-science-workflow',
        title: 'Data Science Workflow',
        content: `# Data Science Workflow & Process

## The Data Science Lifecycle

### 1. Problem Definition
**Goal**: Clearly define what you want to solve or predict.

#### Key Questions:
- What business problem are we solving?
- What type of ML problem is this? (Classification, Regression, Clustering)
- What does success look like?
- What are the constraints? (Time, budget, accuracy requirements)

### 2. Data Collection
**Goal**: Gather relevant, high-quality data for your problem.

#### Data Sources:
- **Internal**: Company databases, logs, surveys
- **External**: APIs, web scraping, public datasets
- **Third-party**: Purchased datasets, partnerships

### 3. Data Exploration & Understanding
**Goal**: Get familiar with your data and identify patterns.

#### Exploratory Data Analysis (EDA):
- **Descriptive Statistics**: Mean, median, mode, standard deviation
- **Data Distribution**: Histograms, box plots
- **Relationships**: Correlation matrices, scatter plots
- **Missing Values**: Identify and understand gaps

### 4. Data Cleaning & Preprocessing
**Goal**: Prepare data for machine learning algorithms.

#### Common Tasks:
- **Handle Missing Values**: Remove, impute, or flag
- **Remove Duplicates**: Identify and eliminate redundant records
- **Fix Data Types**: Convert strings to numbers, dates to datetime
- **Handle Outliers**: Remove or transform extreme values

### 5. Feature Engineering
**Goal**: Create and select the most relevant features for your model.

#### Techniques:
- **Feature Creation**: Combine existing features
- **Feature Selection**: Choose most important features
- **Feature Scaling**: Normalize or standardize values
- **Encoding Categorical Variables**: One-hot encoding, label encoding

### 6. Model Selection & Training
**Goal**: Choose and train the best algorithm for your problem.

#### Algorithm Selection:
- **Linear Models**: Simple, interpretable
- **Tree-based**: Handle non-linear relationships
- **Neural Networks**: Complex patterns
- **Ensemble Methods**: Combine multiple models

### 7. Model Evaluation
**Goal**: Assess how well your model performs.

#### Evaluation Metrics:
**Classification**: Accuracy, Precision, Recall, F1-Score
**Regression**: MAE, MSE, RMSE, R²

### 8. Model Deployment
**Goal**: Put your model into production to make real predictions.

#### Deployment Options:
- **Batch Predictions**: Process data in batches
- **Real-time API**: Serve predictions via web service
- **Edge Deployment**: Run on mobile/IoT devices

### 9. Monitoring & Maintenance
**Goal**: Ensure model continues to perform well over time.

#### Key Activities:
- **Performance Monitoring**: Track accuracy metrics
- **Data Drift Detection**: Identify changes in input data
- **Model Retraining**: Update with new data`,
        codeExample: `# Complete Data Science Workflow Example
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import warnings
warnings.filterwarnings('ignore')

# Set random seed
np.random.seed(42)

print("=== Complete Data Science Workflow ===")
print("Problem: Predict customer churn for a telecom company")

# Step 1: Data Collection (Simulated)
print("\\n1. DATA COLLECTION")
n_customers = 2000

customer_data = {
    'customer_id': range(1, n_customers + 1),
    'age': np.random.normal(40, 15, n_customers).astype(int),
    'tenure_months': np.random.exponential(24, n_customers).astype(int),
    'monthly_charges': np.random.normal(65, 20, n_customers),
    'total_charges': np.random.normal(1500, 800, n_customers),
    'contract_type': np.random.choice(['Month-to-month', 'One year', 'Two year'], 
                                    n_customers, p=[0.5, 0.3, 0.2]),
    'internet_service': np.random.choice(['DSL', 'Fiber optic', 'No'], 
                                       n_customers, p=[0.4, 0.4, 0.2]),
    'tech_support': np.random.choice(['Yes', 'No'], n_customers, p=[0.3, 0.7])
}

df = pd.DataFrame(customer_data)

# Generate churn based on realistic patterns
churn_probability = (
    0.1 +  # Base churn rate
    (df['contract_type'] == 'Month-to-month') * 0.3 +
    (df['tenure_months'] < 12) * 0.2 +
    (df['monthly_charges'] > 80) * 0.15 +
    (df['tech_support'] == 'No') * 0.1 +
    np.random.normal(0, 0.1, n_customers)
)

df['churn'] = (np.random.random(n_customers) < churn_probability).astype(int)

print(f"Dataset created with {len(df)} customers")
print(f"Churn rate: {df['churn'].mean():.2%}")

# Step 2: Data Exploration
print("\\n2. DATA EXPLORATION")
print("\\nDataset Info:")
print(df.info())

print("\\nChurn distribution:")
print(df['churn'].value_counts())

# Step 3: Data Cleaning & Preprocessing
print("\\n3. DATA CLEANING & PREPROCESSING")

# Check for missing values
print("Missing values:")
print(df.isnull().sum())

# Handle outliers
numerical_cols = ['age', 'tenure_months', 'monthly_charges', 'total_charges']
for col in numerical_cols:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]

print(f"Dataset size after cleaning: {len(df)}")

# Step 4: Feature Engineering
print("\\n4. FEATURE ENGINEERING")

# Create new features
df['charges_per_month'] = df['total_charges'] / (df['tenure_months'] + 1)
df['is_senior'] = (df['age'] >= 65).astype(int)
df['high_value_customer'] = (df['monthly_charges'] > df['monthly_charges'].quantile(0.75)).astype(int)

# Encode categorical variables
categorical_cols = ['contract_type', 'internet_service', 'tech_support']
le = LabelEncoder()

for col in categorical_cols:
    df[col + '_encoded'] = le.fit_transform(df[col])

print("New features created and categorical variables encoded")

# Step 5: Model Selection & Training
print("\\n5. MODEL SELECTION & TRAINING")

# Prepare features and target
feature_cols = (['age', 'tenure_months', 'monthly_charges', 'total_charges', 
                'charges_per_month', 'is_senior', 'high_value_customer'] + 
               [col + '_encoded' for col in categorical_cols])

X = df[feature_cols]
y = df['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"Training set: {len(X_train)} samples")
print(f"Test set: {len(X_test)} samples")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train multiple models
models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
}

model_scores = {}

for name, model in models.items():
    if name == 'Logistic Regression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    model_scores[name] = accuracy
    print(f"\\n{name} Accuracy: {accuracy:.4f}")

# Step 6: Model Evaluation
print("\\n6. MODEL EVALUATION")
best_model_name = max(model_scores, key=model_scores.get)
print(f"Best model: {best_model_name}")
print(f"Best accuracy: {model_scores[best_model_name]:.4f}")

# Step 7: Business Impact Analysis
print("\\n7. BUSINESS IMPACT ANALYSIS")
total_customers = len(X_test)
actual_churners = y_test.sum()
avg_customer_value = df['monthly_charges'].mean() * 12
retention_cost = 50
retention_success_rate = 0.3

if best_model_name == 'Logistic Regression':
    y_pred_best = models[best_model_name].predict(X_test_scaled)
else:
    y_pred_best = models[best_model_name].predict(X_test)

correctly_identified = ((y_test == 1) & (y_pred_best == 1)).sum()
potential_savings = correctly_identified * retention_success_rate * avg_customer_value

print(f"Potential annual savings: {potential_savings:,.2f}")
print(f"Correctly identified churners: {correctly_identified}/{actual_churners}")

print("\\n=== Workflow Complete ===")`,
        practiceLinks: [
          { name: 'Kaggle Data Science Courses', url: 'https://www.kaggle.com/learn' },
          { name: 'Data Science Process', url: 'https://www.datascience-pm.com/crisp-dm-2/' },
          { name: 'Google Data Analytics', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' }
        ]
      }
    ]
  },
  supervisedLearning: {
    id: 'supervisedLearning',
    title: 'Supervised Learning',
    description: 'Master classification and regression algorithms with hands-on implementation',
    topics: [
      {
        id: 'linear-regression',
        title: 'Linear Regression',
        content: `# Linear Regression - Predicting Continuous Values

## What is Linear Regression?
**Linear Regression** is a fundamental supervised learning algorithm used to predict continuous numerical values by finding the best linear relationship between input features and the target variable.

### Mathematical Foundation:
\`\`\`
y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ
\`\`\`

## Key Concepts:
- **Dependent Variable (y)**: What we want to predict
- **Independent Variables (X)**: Features used for prediction
- **Coefficients (β)**: Weights showing feature importance
- **Intercept (β₀)**: Base value when all features are zero

## How It Works:
1. **Find Best Fit Line**: Minimize prediction errors
2. **Cost Function**: Mean Squared Error (MSE)
3. **Optimization**: Gradient descent or normal equation
4. **Evaluation**: R², RMSE, MAE metrics

## When to Use:
- Linear relationships between features and target
- Need interpretable results
- Baseline model for comparison
- Small to medium datasets

## Advantages:
- Simple and fast
- Highly interpretable
- No hyperparameter tuning
- Good baseline model

## Disadvantages:
- Assumes linear relationships
- Sensitive to outliers
- Requires feature scaling
- May underfit complex data`,
        codeExample: `# Complete Linear Regression Implementation
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler

# Generate realistic dataset
np.random.seed(42)
n_samples = 1000

# Create house features
data = {
    'size_sqft': np.random.normal(2000, 600, n_samples),
    'bedrooms': np.random.poisson(3, n_samples) + 1,
    'bathrooms': np.random.poisson(2, n_samples) + 1,
    'age_years': np.random.exponential(15, n_samples),
    'garage_spaces': np.random.poisson(1.5, n_samples),
    'distance_to_city': np.random.exponential(10, n_samples)
}

df = pd.DataFrame(data)

# Ensure realistic ranges
df['size_sqft'] = np.clip(df['size_sqft'], 800, 5000)
df['bedrooms'] = np.clip(df['bedrooms'], 1, 6)
df['bathrooms'] = np.clip(df['bathrooms'], 1, 4)
df['age_years'] = np.clip(df['age_years'], 0, 50)
df['garage_spaces'] = np.clip(df['garage_spaces'], 0, 3)
df['distance_to_city'] = np.clip(df['distance_to_city'], 1, 30)

# Generate realistic prices
df['price'] = (
    df['size_sqft'] * 120 +
    df['bedrooms'] * 15000 +
    df['bathrooms'] * 10000 +
    (50 - df['age_years']) * 2000 +
    df['garage_spaces'] * 8000 +
    (30 - df['distance_to_city']) * 3000 +
    np.random.normal(0, 25000, n_samples)
)

df['price'] = np.maximum(df['price'], 50000)

print("=== Linear Regression House Price Prediction ===")
print(f"Dataset: {len(df)} houses")
print(f"Price range: {df['price'].min():,.0f} - {df['price'].max():,.0f}")

# Prepare data
features = ['size_sqft', 'bedrooms', 'bathrooms', 'age_years', 'garage_spaces', 'distance_to_city']
X = df[features]
y = df['price']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\\nTraining samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate model
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print("\\n=== Model Performance ===")
print(f"MAE: {mae:,.2f}")
print(f"RMSE: {rmse:,.2f}")
print(f"R² Score: {r2:.4f}")
print(f"Model explains {r2*100:.2f}% of price variation")

# Feature importance
print("\\n=== Feature Importance ===")
feature_importance = pd.DataFrame({
    'Feature': features,
    'Coefficient': model.coef_,
    'Abs_Coefficient': np.abs(model.coef_)
}).sort_values('Abs_Coefficient', ascending=False)

print(feature_importance)
print(f"\\nIntercept: {model.intercept_:,.2f}")

# Make sample predictions
print("\\n=== Sample Predictions ===")
sample_houses = pd.DataFrame({
    'size_sqft': [1500, 2500, 3500],
    'bedrooms': [3, 4, 5],
    'bathrooms': [2, 3, 4],
    'age_years': [5, 15, 25],
    'garage_spaces': [1, 2, 2],
    'distance_to_city': [5, 10, 20]
})

predictions = model.predict(sample_houses)

for i, (_, house) in enumerate(sample_houses.iterrows()):
    print(f"\\nHouse {i+1}: {house['size_sqft']} sqft, {house['bedrooms']} bed, {house['bathrooms']} bath")
    print(f"Age: {house['age_years']} years, Distance: {house['distance_to_city']} miles")
    print(f"Predicted Price: {predictions[i]:,.2f}")

# Model insights
print("\\n=== Key Insights ===")
print("1. Most important factors:")
for _, row in feature_importance.head(3).iterrows():
    impact = "increases" if row['Coefficient'] > 0 else "decreases"
    print(f"   - {row['Feature']}: {abs(row['Coefficient']):,.0f} {impact} per unit")

print(f"\\n2. Model accuracy: {r2:.1%} of price variation explained")
print(f"3. Average prediction error: {mae:,.0f}")`,
        practiceLinks: [
          { name: 'Scikit-learn Linear Models', url: 'https://scikit-learn.org/stable/modules/linear_model.html' },
          { name: 'Kaggle House Prices', url: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques' },
          { name: 'Linear Regression Theory', url: 'https://www.khanacademy.org/math/statistics-probability' }
        ]
      },
      {
        id: 'classification',
        title: 'Classification Algorithms',
        content: `# Classification - Predicting Categories

## What is Classification?
**Classification** is a supervised learning task where we predict discrete categories or classes for input data.

## Types of Classification:

### 1. Binary Classification:
- **Definition**: Predicting between two classes
- **Examples**: Spam/Not Spam, Pass/Fail, Yes/No
- **Metrics**: Accuracy, Precision, Recall, F1-Score

### 2. Multi-class Classification:
- **Definition**: Predicting among multiple classes
- **Examples**: Image recognition, sentiment analysis
- **Approach**: One-vs-Rest, One-vs-One

### 3. Multi-label Classification:
- **Definition**: Multiple labels can be true simultaneously
- **Examples**: Movie genres, article tags
- **Evaluation**: Hamming loss, subset accuracy

## Popular Classification Algorithms:

### 1. Logistic Regression:
- **How it works**: Uses sigmoid function for probability
- **Pros**: Fast, interpretable, no tuning needed
- **Cons**: Assumes linear relationship

### 2. Decision Trees:
- **How it works**: Creates tree-like decision rules
- **Pros**: Easy to understand and visualize
- **Cons**: Prone to overfitting

### 3. Random Forest:
- **How it works**: Ensemble of decision trees
- **Pros**: Reduces overfitting, handles missing values
- **Cons**: Less interpretable than single tree

### 4. Support Vector Machine (SVM):
- **How it works**: Finds optimal decision boundary
- **Pros**: Works well with high dimensions
- **Cons**: Slow on large datasets`,
        codeExample: `# Email Spam Classification
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Generate sample email data
np.random.seed(42)
n_emails = 1000

# Sample email texts (simplified)
spam_words = ['free', 'win', 'money', 'offer', 'click', 'buy', 'sale', 'urgent']
ham_words = ['meeting', 'project', 'team', 'work', 'schedule', 'report', 'update']

emails = []
labels = []

for i in range(n_emails):
    if np.random.random() < 0.3:  # 30% spam
        # Generate spam email
        words = np.random.choice(spam_words, size=np.random.randint(3, 8))
        email = ' '.join(words) + ' ' + ' '.join(np.random.choice(['amazing', 'now', 'limited'], size=2))
        emails.append(email)
        labels.append(1)  # Spam
    else:
        # Generate ham email
        words = np.random.choice(ham_words, size=np.random.randint(3, 8))
        email = ' '.join(words) + ' ' + ' '.join(np.random.choice(['please', 'thanks', 'regards'], size=2))
        emails.append(email)
        labels.append(0)  # Ham

df = pd.DataFrame({
    'email': emails,
    'label': labels
})

print("=== Email Spam Classification ===")
print(f"Dataset: {len(df)} emails")
print(f"Spam rate: {df['label'].mean():.2%}")

# Text preprocessing and feature extraction
vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
X = vectorizer.fit_transform(df['email'])
y = df['label']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"\nTraining samples: {X_train.shape[0]}")
print(f"Test samples: {X_test.shape[0]}")
print(f"Features: {X_train.shape[1]}")

# Train multiple classifiers
classifiers = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(kernel='rbf', random_state=42)
}

results = {}

print("\n=== Model Comparison ===")
for name, clf in classifiers.items():
    # Train
    clf.fit(X_train, y_train)
    
    # Predict
    y_pred = clf.predict(X_test)
    
    # Evaluate
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    results[name] = {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1
    }
    
    print(f"\n{name}:")
    print(f"  Accuracy: {accuracy:.4f}")
    print(f"  Precision: {precision:.4f}")
    print(f"  Recall: {recall:.4f}")
    print(f"  F1-Score: {f1:.4f}")

# Best model analysis
best_model = max(results.keys(), key=lambda x: results[x]['f1'])
print(f"\n=== Best Model: {best_model} ===")
print(f"F1-Score: {results[best_model]['f1']:.4f}")

# Feature importance for best model
if best_model == 'Random Forest':
    feature_names = vectorizer.get_feature_names_out()
    importances = classifiers[best_model].feature_importances_
    
    feature_importance = pd.DataFrame({
        'feature': feature_names,
        'importance': importances
    }).sort_values('importance', ascending=False)
    
    print("\nTop 10 Important Features:")
    print(feature_importance.head(10))

print("\n=== Classification Complete ===")

# Sample predictions
print("\n=== Sample Predictions ===")
sample_emails = [
    "free money win now click here",
    "team meeting scheduled for tomorrow",
    "urgent offer limited time buy now"
]

for email in sample_emails:
    email_vector = vectorizer.transform([email])
    prediction = classifiers[best_model].predict(email_vector)[0]
    probability = classifiers[best_model].predict_proba(email_vector)[0] if hasattr(classifiers[best_model], 'predict_proba') else None
    
    label = "SPAM" if prediction == 1 else "HAM"
    print(f"\nEmail: '{email}'")
    print(f"Prediction: {label}")
    if probability is not None:
        print(f"Confidence: {max(probability):.3f}")`,
        practiceLinks: [
          { name: 'Scikit-learn Classification', url: 'https://scikit-learn.org/stable/supervised_learning.html' },
          { name: 'Classification Metrics', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
          { name: 'Text Classification Tutorial', url: 'https://www.kaggle.com/learn/natural-language-processing' }
        ]
      }
    ]
  },
  unsupervisedLearning: {
    id: 'unsupervisedLearning',
    title: 'Unsupervised Learning',
    description: 'Discover patterns in data without labels using clustering and dimensionality reduction',
    topics: [
      {
        id: 'clustering',
        title: 'Clustering Algorithms',
        content: `# Clustering - Finding Hidden Patterns in Data

## What is Clustering?
**Clustering** is an unsupervised learning technique that groups similar data points together without knowing the correct answers beforehand.

## Key Concepts:
- **Clusters**: Groups of similar data points
- **Centroids**: Center points of clusters
- **Distance Metrics**: How we measure similarity
- **Intra-cluster Distance**: Distance within clusters (minimize)
- **Inter-cluster Distance**: Distance between clusters (maximize)

## Popular Clustering Algorithms:

### 1. K-Means Clustering:
- **How it works**: Divides data into k clusters
- **Algorithm**: Iteratively updates cluster centers
- **Pros**: Simple, fast, works well with spherical clusters
- **Cons**: Need to specify k, sensitive to initialization

### 2. Hierarchical Clustering:
- **How it works**: Creates tree of clusters
- **Types**: Agglomerative (bottom-up), Divisive (top-down)
- **Pros**: No need to specify number of clusters
- **Cons**: Computationally expensive for large datasets

### 3. DBSCAN:
- **How it works**: Groups points that are closely packed
- **Parameters**: eps (neighborhood radius), min_samples
- **Pros**: Finds arbitrary shaped clusters, handles noise
- **Cons**: Sensitive to parameters, struggles with varying densities`,
        codeExample: `# Customer Segmentation with Clustering
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# Generate sample customer data
np.random.seed(42)
n_customers = 500

customer_data = {
    'annual_spending': np.random.normal(50000, 20000, n_customers),
    'frequency_visits': np.random.poisson(12, n_customers),
    'avg_purchase': np.random.normal(150, 50, n_customers),
    'loyalty_years': np.random.exponential(3, n_customers)
}

df = pd.DataFrame(customer_data)
df['annual_spending'] = np.clip(df['annual_spending'], 10000, 150000)
df['avg_purchase'] = np.clip(df['avg_purchase'], 20, 500)
df['loyalty_years'] = np.clip(df['loyalty_years'], 0, 15)

print("=== Customer Segmentation with Clustering ===")
print(f"Dataset: {len(df)} customers")
print("\\nCustomer Data Summary:")
print(df.describe())

# Prepare data for clustering
features = ['annual_spending', 'frequency_visits', 'avg_purchase', 'loyalty_years']
X = df[features]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print("\\n=== K-Means Clustering ===")

# Find optimal number of clusters
inertias = []
silhouette_scores = []
k_range = range(2, 8)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X_scaled, kmeans.labels_))

# Choose optimal k
optimal_k = k_range[np.argmax(silhouette_scores)]
print(f"Optimal number of clusters: {optimal_k}")
print(f"Best silhouette score: {max(silhouette_scores):.3f}")

# Apply K-Means with optimal k
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_scaled)

print("\\nCluster Analysis:")
for cluster in range(optimal_k):
    cluster_data = df[df['cluster'] == cluster]
    print(f"\\nCluster {cluster} ({len(cluster_data)} customers):")
    print(f"  Avg Annual Spending: {cluster_data['annual_spending'].mean():,.0f}")
    print(f"  Avg Visits/Year: {cluster_data['frequency_visits'].mean():.1f}")
    print(f"  Avg Purchase: {cluster_data['avg_purchase'].mean():.0f}")
    print(f"  Avg Loyalty: {cluster_data['loyalty_years'].mean():.1f} years")

# Business insights
print("\\n=== Business Insights ===")
for cluster in range(optimal_k):
    cluster_data = df[df['cluster'] == cluster]
    avg_spending = cluster_data['annual_spending'].mean()
    avg_visits = cluster_data['frequency_visits'].mean()
    
    if avg_spending > 70000 and avg_visits > 15:
        segment_type = "VIP Customers"
    elif avg_spending > 50000:
        segment_type = "High-Value Customers"
    elif avg_visits > 10:
        segment_type = "Frequent Shoppers"
    else:
        segment_type = "Regular Customers"
    
    print(f"\\nCluster {cluster}: {segment_type}")
    print(f"  Size: {len(cluster_data)} customers ({len(cluster_data)/len(df)*100:.1f}%)")
    print(f"  Revenue potential: {avg_spending * len(cluster_data):,.0f}")

print("\\n=== Clustering Complete ===")`,
        practiceLinks: [
          { name: 'Scikit-learn Clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
          { name: 'K-Means Tutorial', url: 'https://www.kaggle.com/learn/clustering' },
          { name: 'Customer Segmentation', url: 'https://www.kaggle.com/datasets/vjchoudhary7/customer-segmentation-tutorial-in-python' }
        ]
      },
      {
        id: 'dimensionality-reduction',
        title: 'Dimensionality Reduction',
        content: `# Dimensionality Reduction - Simplifying Complex Data

## What is Dimensionality Reduction?
**Dimensionality Reduction** is the process of reducing the number of features in a dataset while preserving important information.

## Why Reduce Dimensions?

### Benefits:
- **Visualization**: Plot high-dimensional data in 2D/3D
- **Storage**: Reduce memory and disk space
- **Speed**: Faster training and prediction
- **Noise Reduction**: Remove irrelevant features
- **Curse of Dimensionality**: Avoid performance degradation

### Challenges:
- **Information Loss**: May lose important patterns
- **Interpretability**: Transformed features less meaningful
- **Parameter Tuning**: Need to choose optimal dimensions

## Popular Techniques:

### 1. Principal Component Analysis (PCA):
- **How it works**: Finds directions of maximum variance
- **Linear**: Creates linear combinations of features
- **Pros**: Fast, interpretable, removes correlation
- **Cons**: Linear assumptions, all features needed

### 2. t-SNE (t-Distributed Stochastic Neighbor Embedding):
- **How it works**: Preserves local neighborhood structure
- **Non-linear**: Captures complex relationships
- **Pros**: Great for visualization, finds clusters
- **Cons**: Slow, not deterministic, only for visualization

### 3. Linear Discriminant Analysis (LDA):
- **How it works**: Maximizes class separation
- **Supervised**: Uses class labels for reduction
- **Pros**: Good for classification tasks
- **Cons**: Limited to (classes-1) dimensions

### 4. Feature Selection:
- **Univariate**: Statistical tests for each feature
- **Recursive**: Iteratively remove least important
- **L1 Regularization**: Automatic feature selection`,
        codeExample: `# Dimensionality Reduction Comparison
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits, make_classification
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import time

# Load digit recognition dataset
print("=== Dimensionality Reduction Analysis ===")
digits = load_digits()
X, y = digits.data, digits.target

print(f"Original dataset shape: {X.shape}")
print(f"Number of classes: {len(np.unique(y))}")
print(f"Feature range: {X.min():.1f} to {X.max():.1f}")

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data for evaluation
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Baseline performance with all features
print("\n=== Baseline Performance ===")
rf_baseline = RandomForestClassifier(n_estimators=100, random_state=42)
start_time = time.time()
rf_baseline.fit(X_train, y_train)
baseline_time = time.time() - start_time
y_pred_baseline = rf_baseline.predict(X_test)
baseline_accuracy = accuracy_score(y_test, y_pred_baseline)

print(f"Training time: {baseline_time:.3f} seconds")
print(f"Accuracy: {baseline_accuracy:.4f}")
print(f"Features used: {X_train.shape[1]}")

# 1. Principal Component Analysis (PCA)
print("\n=== PCA Analysis ===")
pca = PCA(n_components=0.95)  # Keep 95% of variance
X_train_pca = pca.fit_transform(X_train)
X_test_pca = pca.transform(X_test)

print(f"Components needed for 95% variance: {pca.n_components_}")
print(f"Explained variance ratio: {pca.explained_variance_ratio_.sum():.4f}")

# Train model with PCA features
rf_pca = RandomForestClassifier(n_estimators=100, random_state=42)
start_time = time.time()
rf_pca.fit(X_train_pca, y_train)
pca_time = time.time() - start_time
y_pred_pca = rf_pca.predict(X_test_pca)
pca_accuracy = accuracy_score(y_test, y_pred_pca)

print(f"Training time: {pca_time:.3f} seconds")
print(f"Accuracy: {pca_accuracy:.4f}")
print(f"Features used: {X_train_pca.shape[1]}")
print(f"Dimension reduction: {(1 - X_train_pca.shape[1]/X_train.shape[1])*100:.1f}%")

# 2. Linear Discriminant Analysis (LDA)
print("\n=== LDA Analysis ===")
lda = LinearDiscriminantAnalysis()
X_train_lda = lda.fit_transform(X_train, y_train)
X_test_lda = lda.transform(X_test)

print(f"LDA components: {X_train_lda.shape[1]}")
print(f"Explained variance ratio: {lda.explained_variance_ratio_.sum():.4f}")

# Train model with LDA features
rf_lda = RandomForestClassifier(n_estimators=100, random_state=42)
start_time = time.time()
rf_lda.fit(X_train_lda, y_train)
lda_time = time.time() - start_time
y_pred_lda = rf_lda.predict(X_test_lda)
lda_accuracy = accuracy_score(y_test, y_pred_lda)

print(f"Training time: {lda_time:.3f} seconds")
print(f"Accuracy: {lda_accuracy:.4f}")
print(f"Features used: {X_train_lda.shape[1]}")

# 3. Feature Selection (Top K)
print("\n=== Feature Selection Analysis ===")
from sklearn.feature_selection import SelectKBest, f_classif

# Select top 20 features
selector = SelectKBest(score_func=f_classif, k=20)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

# Train model with selected features
rf_selected = RandomForestClassifier(n_estimators=100, random_state=42)
start_time = time.time()
rf_selected.fit(X_train_selected, y_train)
selected_time = time.time() - start_time
y_pred_selected = rf_selected.predict(X_test_selected)
selected_accuracy = accuracy_score(y_test, y_pred_selected)

print(f"Training time: {selected_time:.3f} seconds")
print(f"Accuracy: {selected_accuracy:.4f}")
print(f"Features used: {X_train_selected.shape[1]}")

# Comparison summary
print("\n=== Method Comparison ===")
results = pd.DataFrame({
    'Method': ['Baseline', 'PCA', 'LDA', 'Feature Selection'],
    'Features': [X_train.shape[1], X_train_pca.shape[1], X_train_lda.shape[1], X_train_selected.shape[1]],
    'Accuracy': [baseline_accuracy, pca_accuracy, lda_accuracy, selected_accuracy],
    'Training Time': [baseline_time, pca_time, lda_time, selected_time],
    'Speedup': [1.0, baseline_time/pca_time, baseline_time/lda_time, baseline_time/selected_time]
})

print(results.round(4))

# Best method
best_method = results.loc[results['Accuracy'].idxmax(), 'Method']
print(f"\nBest method: {best_method}")
print(f"Accuracy: {results.loc[results['Accuracy'].idxmax(), 'Accuracy']:.4f}")

# PCA component analysis
print("\n=== PCA Component Analysis ===")
cumulative_variance = np.cumsum(pca.explained_variance_ratio_)
for i, var in enumerate([0.8, 0.9, 0.95, 0.99]):
    components_needed = np.argmax(cumulative_variance >= var) + 1
    print(f"{var*100}% variance: {components_needed} components")

print("\n=== Analysis Complete ===")`,
        practiceLinks: [
          { name: 'PCA Tutorial', url: 'https://scikit-learn.org/stable/modules/decomposition.html' },
          { name: 't-SNE Guide', url: 'https://scikit-learn.org/stable/modules/manifold.html' },
          { name: 'Feature Selection', url: 'https://scikit-learn.org/stable/modules/feature_selection.html' }
        ]
      }
    ]
  },
  deepLearning: {
    id: 'deepLearning',
    title: 'Deep Learning',
    description: 'Neural networks, CNNs, RNNs, and modern deep learning architectures',
    topics: [
      {
        id: 'neural-networks',
        title: 'Neural Network Fundamentals',
        content: `# Neural Networks - The Foundation of Deep Learning

## What are Neural Networks?
**Neural Networks** are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information.

## Key Components:

### 1. Neurons (Nodes):
- **Input Layer**: Receives data
- **Hidden Layers**: Process information
- **Output Layer**: Produces results

### 2. Connections (Weights):
- **Weights**: Strength of connections between neurons
- **Bias**: Additional parameter for each neuron
- **Activation Function**: Determines neuron output

### 3. Architecture:
- **Feedforward**: Information flows in one direction
- **Backpropagation**: Learning algorithm that adjusts weights
- **Epochs**: Complete passes through training data

## Common Activation Functions:

### 1. ReLU (Rectified Linear Unit):
- **Formula**: f(x) = max(0, x)
- **Pros**: Simple, prevents vanishing gradient
- **Cons**: Can cause "dying ReLU" problem

### 2. Sigmoid:
- **Formula**: f(x) = 1 / (1 + e^(-x))
- **Pros**: Smooth, outputs between 0 and 1
- **Cons**: Vanishing gradient problem

### 3. Tanh:
- **Formula**: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))
- **Pros**: Outputs between -1 and 1, zero-centered
- **Cons**: Still suffers from vanishing gradient

## Training Process:

### 1. Forward Pass:
- Input data flows through network
- Each layer applies weights and activation functions
- Produces prediction at output layer

### 2. Loss Calculation:
- Compare prediction with actual target
- Calculate error using loss function
- Common loss functions: MSE, Cross-entropy

### 3. Backward Pass (Backpropagation):
- Calculate gradients of loss with respect to weights
- Update weights to minimize loss
- Use optimization algorithms like SGD, Adam`,
        codeExample: `# Neural Network Implementation from Scratch
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.01):
        # Initialize weights and biases
        self.W1 = np.random.randn(input_size, hidden_size) * 0.01
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.01
        self.b2 = np.zeros((1, output_size))
        self.learning_rate = learning_rate
        self.loss_history = []
    
    def sigmoid(self, x):
        x = np.clip(x, -500, 500)  # Prevent overflow
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        m = X.shape[0]
        
        # Calculate gradients
        dz2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        dz1 = np.dot(dz2, self.W2.T) * self.sigmoid_derivative(self.a1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Update weights and biases
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1
    
    def train(self, X, y, epochs=1000):
        for epoch in range(epochs):
            output = self.forward(X)
            loss = -np.mean(y * np.log(output + 1e-8) + (1 - y) * np.log(1 - output + 1e-8))
            self.backward(X, y, output)
            self.loss_history.append(loss)
            
            if epoch % 200 == 0:
                accuracy = np.mean((output > 0.5) == y)
                print(f"Epoch {epoch}, Loss: {loss:.4f}, Accuracy: {accuracy:.4f}")
    
    def predict(self, X):
        output = self.forward(X)
        return (output > 0.5).astype(int)

# Generate dataset
print("=== Neural Network from Scratch ===")
X, y = make_classification(n_samples=1000, n_features=10, n_informative=8, 
                          n_redundant=2, random_state=42)
y = y.reshape(-1, 1)

print(f"Dataset shape: {X.shape}")
print(f"Class distribution: {np.bincount(y.flatten())}")

# Split and scale data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"\\nTraining samples: {len(X_train_scaled)}")
print(f"Test samples: {len(X_test_scaled)}")

# Create and train neural network
print("\\n=== Training Neural Network ===")
nn = NeuralNetwork(input_size=10, hidden_size=16, output_size=1, learning_rate=0.1)
nn.train(X_train_scaled, y_train, epochs=1000)

# Evaluate
print("\\n=== Model Evaluation ===")
y_pred = nn.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {accuracy:.4f}")

# Network summary
print("\\n=== Network Architecture ===")
print(f"Input Layer: {X.shape[1]} neurons")
print(f"Hidden Layer: {nn.W1.shape[1]} neurons")
print(f"Output Layer: {nn.W2.shape[1]} neuron")
print(f"Total Parameters: {nn.W1.size + nn.b1.size + nn.W2.size + nn.b2.size}")

print("\\n=== Training Complete ===")`,
        practiceLinks: [
          { name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning' },
          { name: 'Neural Networks Playground', url: 'https://playground.tensorflow.org/' },
          { name: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' }
        ]
      },
      {
        id: 'cnn',
        title: 'Convolutional Neural Networks (CNN)',
        content: `# Convolutional Neural Networks - Computer Vision Powerhouse

## What are CNNs?
**Convolutional Neural Networks (CNNs)** are specialized neural networks designed for processing grid-like data such as images. They use convolution operations to detect features.

## Key Components:

### 1. Convolutional Layer:
- **Purpose**: Detect features using filters/kernels
- **Operation**: Slide filters across input to create feature maps
- **Parameters**: Filter size, stride, padding
- **Output**: Feature maps highlighting detected patterns

### 2. Pooling Layer:
- **Purpose**: Reduce spatial dimensions and computation
- **Types**: Max pooling, Average pooling
- **Benefits**: Translation invariance, noise reduction
- **Common**: 2x2 max pooling with stride 2

### 3. Fully Connected Layer:
- **Purpose**: Final classification/regression
- **Input**: Flattened feature maps
- **Output**: Class probabilities or predictions

## CNN Architecture Patterns:

### 1. LeNet-5 (1998):
- **Structure**: Conv → Pool → Conv → Pool → FC → FC
- **Use Case**: Handwritten digit recognition
- **Innovation**: First successful CNN architecture

### 2. AlexNet (2012):
- **Structure**: Deeper network with ReLU activation
- **Innovation**: GPU training, dropout regularization
- **Impact**: Sparked deep learning revolution

### 3. VGG (2014):
- **Structure**: Very deep networks (16-19 layers)
- **Innovation**: Small 3x3 filters throughout
- **Advantage**: Better feature learning

### 4. ResNet (2015):
- **Structure**: Skip connections (residual blocks)
- **Innovation**: Solved vanishing gradient problem
- **Achievement**: 152 layers deep

## Common Applications:

### Image Classification:
- **Task**: Assign labels to entire images
- **Examples**: Cat vs Dog, Medical diagnosis
- **Metrics**: Accuracy, Top-5 accuracy

### Object Detection:
- **Task**: Locate and classify objects in images
- **Examples**: Self-driving cars, surveillance
- **Architectures**: YOLO, R-CNN, SSD

### Image Segmentation:
- **Task**: Pixel-level classification
- **Examples**: Medical imaging, autonomous driving
- **Types**: Semantic, Instance segmentation`,
        codeExample: `# CNN Implementation with TensorFlow/Keras
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report

# Load and preprocess CIFAR-10 dataset
print("=== CNN for Image Classification ===")
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()

# Class names
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
               'dog', 'frog', 'horse', 'ship', 'truck']

print(f"Training data shape: {x_train.shape}")
print(f"Test data shape: {x_test.shape}")
print(f"Number of classes: {len(class_names)}")

# Normalize pixel values
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# Convert labels to categorical
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

# Build CNN model
def create_cnn_model():
    model = keras.Sequential([
        # First Convolutional Block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Second Convolutional Block
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Third Convolutional Block
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.25),
        
        # Fully Connected Layers
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    return model

# Create and compile model
model = create_cnn_model()
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("\\n=== Model Architecture ===")
model.summary()

# Calculate model parameters
total_params = model.count_params()
print(f"\\nTotal parameters: {total_params:,}")

# Data augmentation
datagen = keras.preprocessing.image.ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    zoom_range=0.1
)
datagen.fit(x_train)

# Training callbacks
callbacks = [
    keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
    keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3)
]

print("\\n=== Training CNN ===")
# Train model (reduced epochs for demo)
history = model.fit(
    datagen.flow(x_train, y_train, batch_size=32),
    epochs=10,  # Increase for better results
    validation_data=(x_test, y_test),
    callbacks=callbacks,
    verbose=1
)

# Evaluate model
print("\\n=== Model Evaluation ===")
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f"Test Accuracy: {test_accuracy:.4f}")
print(f"Test Loss: {test_loss:.4f}")

# Make predictions
y_pred = model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true_classes = np.argmax(y_test, axis=1)

# Classification report
print("\\n=== Classification Report ===")
print(classification_report(y_true_classes, y_pred_classes, 
                          target_names=class_names))

# Feature visualization function
def visualize_feature_maps(model, image, layer_name):
    # Create a model that outputs feature maps
    feature_model = keras.Model(
        inputs=model.input,
        outputs=model.get_layer(layer_name).output
    )
    
    # Get feature maps
    feature_maps = feature_model.predict(image.reshape(1, 32, 32, 3))
    
    # Plot first 8 feature maps
    fig, axes = plt.subplots(2, 4, figsize=(12, 6))
    for i in range(8):
        ax = axes[i//4, i%4]
        ax.imshow(feature_maps[0, :, :, i], cmap='viridis')
        ax.set_title(f'Feature Map {i+1}')
        ax.axis('off')
    plt.tight_layout()
    plt.show()

# Sample prediction
print("\\n=== Sample Predictions ===")
sample_indices = np.random.choice(len(x_test), 5)
for i, idx in enumerate(sample_indices):
    image = x_test[idx]
    true_label = class_names[y_true_classes[idx]]
    pred_label = class_names[y_pred_classes[idx]]
    confidence = np.max(y_pred[idx])
    
    print(f"Sample {i+1}:")
    print(f"  True: {true_label}")
    print(f"  Predicted: {pred_label}")
    print(f"  Confidence: {confidence:.3f}")
    print(f"  Correct: {'✓' if true_label == pred_label else '✗'}")

print("\\n=== CNN Training Complete ===")`,
        practiceLinks: [
          { name: 'CNN Explainer', url: 'https://poloclub.github.io/cnn-explainer/' },
          { name: 'CS231n CNN Course', url: 'http://cs231n.stanford.edu/' },
          { name: 'Keras CNN Tutorial', url: 'https://keras.io/examples/vision/' }
        ]
      },
      {
        id: 'rnn-lstm',
        title: 'RNN & LSTM Networks',
        content: `# Recurrent Neural Networks - Processing Sequential Data

## What are RNNs?
**Recurrent Neural Networks (RNNs)** are designed to work with sequential data by maintaining memory of previous inputs through hidden states.

## Key Concepts:

### 1. Sequential Processing:
- **Memory**: Hidden state carries information from previous steps
- **Unfolding**: RNN can be "unrolled" through time
- **Applications**: Text, speech, time series, video

### 2. Hidden State:
- **Formula**: h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b_h)
- **Purpose**: Stores information from previous time steps
- **Challenge**: Vanishing gradient problem

## RNN Variants:

### 1. Vanilla RNN:
- **Structure**: Simple recurrent connections
- **Problem**: Vanishing gradients for long sequences
- **Use Case**: Short sequences only

### 2. Long Short-Term Memory (LSTM):
- **Innovation**: Gating mechanisms to control information flow
- **Gates**: Forget, Input, Output gates
- **Advantage**: Handles long-term dependencies
- **Cell State**: Separate from hidden state

### 3. Gated Recurrent Unit (GRU):
- **Structure**: Simplified version of LSTM
- **Gates**: Reset and Update gates
- **Advantage**: Fewer parameters, faster training

## LSTM Architecture:

### Gates Explained:

#### 1. Forget Gate:
- **Purpose**: Decide what information to discard
- **Formula**: f_t = σ(W_f * [h_{t-1}, x_t] + b_f)
- **Output**: Values between 0 (forget) and 1 (keep)

#### 2. Input Gate:
- **Purpose**: Decide what new information to store
- **Components**: Input gate + candidate values
- **Formula**: i_t = σ(W_i * [h_{t-1}, x_t] + b_i)

#### 3. Output Gate:
- **Purpose**: Control what parts of cell state to output
- **Formula**: o_t = σ(W_o * [h_{t-1}, x_t] + b_o)
- **Hidden State**: h_t = o_t * tanh(C_t)

## Common Applications:

### 1. Natural Language Processing:
- **Language Modeling**: Predict next word
- **Machine Translation**: Seq2seq models
- **Sentiment Analysis**: Text classification
- **Text Generation**: Creative writing, chatbots

### 2. Time Series Forecasting:
- **Stock Prices**: Financial predictions
- **Weather**: Temperature, rainfall forecasting
- **Sales**: Demand forecasting
- **IoT Sensors**: Equipment monitoring

### 3. Speech Processing:
- **Speech Recognition**: Audio to text
- **Speech Synthesis**: Text to speech
- **Voice Commands**: Virtual assistants`,
        codeExample: `# LSTM for Time Series Forecasting
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Generate synthetic time series data
np.random.seed(42)
def generate_time_series(n_points=1000):
    time = np.arange(n_points)
    # Combine trend, seasonality, and noise
    trend = 0.02 * time
    seasonal = 10 * np.sin(2 * np.pi * time / 50) + 5 * np.sin(2 * np.pi * time / 12)
    noise = np.random.normal(0, 2, n_points)
    series = trend + seasonal + noise + 50
    return series

print("=== LSTM Time Series Forecasting ===")
data = generate_time_series(1000)
print(f"Generated time series with {len(data)} points")

# Prepare data for LSTM
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:(i + seq_length)])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

# Normalize data
scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data.reshape(-1, 1)).flatten()

# Create sequences
seq_length = 20
X, y = create_sequences(data_scaled, seq_length)

print(f"Sequence shape: {X.shape}")
print(f"Target shape: {y.shape}")

# Split data
train_size = int(0.8 * len(X))
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Reshape for LSTM (samples, time steps, features)
X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))

print(f"\\nTraining data: {X_train.shape}")
print(f"Test data: {X_test.shape}")

# Build LSTM model
def create_lstm_model(seq_length):
    model = keras.Sequential([
        # First LSTM layer with return sequences
        layers.LSTM(50, return_sequences=True, input_shape=(seq_length, 1)),
        layers.Dropout(0.2),
        
        # Second LSTM layer
        layers.LSTM(50, return_sequences=False),
        layers.Dropout(0.2),
        
        # Dense layers
        layers.Dense(25, activation='relu'),
        layers.Dense(1)
    ])
    return model

# Create and compile model
model = create_lstm_model(seq_length)
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

print("\\n=== LSTM Model Architecture ===")
model.summary()

# Training callbacks
callbacks = [
    keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
    keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=5)
]

# Train model
print("\\n=== Training LSTM ===")
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    callbacks=callbacks,
    verbose=1
)

# Make predictions
print("\\n=== Making Predictions ===")
y_pred = model.predict(X_test)

# Inverse transform predictions
y_test_original = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
y_pred_original = scaler.inverse_transform(y_pred).flatten()

# Calculate metrics
mse = mean_squared_error(y_test_original, y_pred_original)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test_original, y_pred_original)

print(f"\\n=== Model Performance ===")
print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"MAPE: {np.mean(np.abs((y_test_original - y_pred_original) / y_test_original)) * 100:.2f}%")

# Multi-step forecasting
def forecast_future(model, last_sequence, n_steps, scaler):
    predictions = []
    current_sequence = last_sequence.copy()
    
    for _ in range(n_steps):
        # Predict next value
        next_pred = model.predict(current_sequence.reshape(1, seq_length, 1), verbose=0)
        predictions.append(next_pred[0, 0])
        
        # Update sequence
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[-1] = next_pred[0, 0]
    
    # Inverse transform
    predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()
    return predictions

# Forecast next 30 points
print("\\n=== Future Forecasting ===")
last_sequence = X_test[-1].flatten()
future_predictions = forecast_future(model, last_sequence, 30, scaler)

print(f"Forecasted next 30 points")
print(f"Forecast range: {future_predictions.min():.2f} to {future_predictions.max():.2f}")

# Sample predictions comparison
print("\\n=== Sample Predictions ===")
for i in range(0, min(10, len(y_test_original)), 2):
    actual = y_test_original[i]
    predicted = y_pred_original[i]
    error = abs(actual - predicted)
    print(f"Point {i+1}: Actual={actual:.2f}, Predicted={predicted:.2f}, Error={error:.2f}")

print("\\n=== LSTM Training Complete ===")

# Text generation example (bonus)
print("\\n=== Bonus: Text Generation with LSTM ===")

# Simple character-level text generation
def create_text_lstm():
    # Sample text
    text = "hello world this is a simple example of text generation using lstm networks"
    chars = sorted(list(set(text)))
    char_to_idx = {char: i for i, char in enumerate(chars)}
    idx_to_char = {i: char for i, char in enumerate(chars)}
    
    # Prepare sequences
    seq_len = 10
    X_text, y_text = [], []
    for i in range(len(text) - seq_len):
        X_text.append([char_to_idx[char] for char in text[i:i+seq_len]])
        y_text.append(char_to_idx[text[i+seq_len]])
    
    X_text = np.array(X_text)
    y_text = keras.utils.to_categorical(y_text, len(chars))
    
    # Simple LSTM for text
    text_model = keras.Sequential([
        layers.Embedding(len(chars), 50, input_length=seq_len),
        layers.LSTM(100),
        layers.Dense(len(chars), activation='softmax')
    ])
    
    text_model.compile(optimizer='adam', loss='categorical_crossentropy')
    text_model.fit(X_text, y_text, epochs=100, verbose=0)
    
    # Generate text
    seed = "hello worl"
    generated = seed
    for _ in range(20):
        x = np.array([[char_to_idx[char] for char in generated[-seq_len:]]])
        pred = text_model.predict(x, verbose=0)
        next_char = idx_to_char[np.argmax(pred)]
        generated += next_char
    
    print(f"Seed: '{seed}'")
    print(f"Generated: '{generated}'")

create_text_lstm()`,
        practiceLinks: [
          { name: 'Understanding LSTM', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
          { name: 'Keras RNN Guide', url: 'https://keras.io/guides/working_with_rnns/' },
          { name: 'Time Series with LSTM', url: 'https://machinelearningmastery.com/time-series-forecasting-long-short-term-memory-network-python/' }
        ]
      },
      {
        id: 'transformers',
        title: 'Transformers & Attention',
        content: `# Transformers - The Revolution in Deep Learning

## What are Transformers?
**Transformers** are a neural network architecture that revolutionized NLP and beyond by using self-attention mechanisms instead of recurrence or convolution.

## Key Innovation: Attention Mechanism

### Self-Attention:
- **Purpose**: Allow each position to attend to all positions in the sequence
- **Advantage**: Parallel processing, long-range dependencies
- **Formula**: Attention(Q,K,V) = softmax(QK^T/√d_k)V

### Multi-Head Attention:
- **Concept**: Multiple attention heads focus on different aspects
- **Benefits**: Capture various types of relationships
- **Implementation**: Concatenate and project multiple attention outputs

## Transformer Architecture:

### 1. Encoder:
- **Structure**: Stack of identical layers
- **Components**: Multi-head attention + Feed-forward network
- **Residual Connections**: Skip connections around each sub-layer
- **Layer Normalization**: Stabilizes training

### 2. Decoder:
- **Structure**: Similar to encoder with modifications
- **Masked Attention**: Prevents looking at future tokens
- **Cross-Attention**: Attends to encoder outputs

### 3. Positional Encoding:
- **Purpose**: Inject sequence order information
- **Method**: Sinusoidal functions or learned embeddings
- **Necessity**: Transformers have no inherent position awareness

## Popular Transformer Models:

### 1. BERT (Bidirectional Encoder Representations):
- **Architecture**: Encoder-only transformer
- **Training**: Masked language modeling + Next sentence prediction
- **Use Cases**: Text classification, question answering
- **Innovation**: Bidirectional context understanding

### 2. GPT (Generative Pre-trained Transformer):
- **Architecture**: Decoder-only transformer
- **Training**: Autoregressive language modeling
- **Use Cases**: Text generation, completion
- **Versions**: GPT-1, GPT-2, GPT-3, GPT-4

### 3. T5 (Text-to-Text Transfer Transformer):
- **Architecture**: Encoder-decoder transformer
- **Approach**: All tasks as text-to-text
- **Training**: Span corruption objective
- **Flexibility**: Unified framework for all NLP tasks

## Applications Beyond NLP:

### 1. Computer Vision:
- **Vision Transformer (ViT)**: Images as sequences of patches
- **DETR**: Object detection with transformers
- **Advantages**: Global context, fewer inductive biases

### 2. Multimodal:
- **CLIP**: Vision and language understanding
- **DALL-E**: Text-to-image generation
- **Applications**: Image captioning, visual question answering

### 3. Other Domains:
- **Protein Folding**: AlphaFold uses attention
- **Music Generation**: MuseNet, Jukebox
- **Code Generation**: GitHub Copilot, CodeT5`,
        codeExample: `# Transformer Implementation with TensorFlow
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

class MultiHeadAttention(layers.Layer):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        
        assert d_model % self.num_heads == 0
        
        self.depth = d_model // self.num_heads
        
        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)
        
        self.dense = layers.Dense(d_model)
    
    def split_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])
    
    def call(self, v, k, q, mask=None):
        batch_size = tf.shape(q)[0]
        
        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)
        
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        
        # Scaled dot-product attention
        scaled_attention, attention_weights = self.scaled_dot_product_attention(q, k, v, mask)
        
        scaled_attention = tf.transpose(scaled_attention, perm=[0, 2, 1, 3])
        
        concat_attention = tf.reshape(scaled_attention, (batch_size, -1, self.d_model))
        
        output = self.dense(concat_attention)
        
        return output, attention_weights
    
    def scaled_dot_product_attention(self, q, k, v, mask):
        matmul_qk = tf.matmul(q, k, transpose_b=True)
        
        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)
        
        if mask is not None:
            scaled_attention_logits += (mask * -1e9)
        
        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        
        output = tf.matmul(attention_weights, v)
        
        return output, attention_weights

class TransformerBlock(layers.Layer):
    def __init__(self, d_model, num_heads, dff, rate=0.1):
        super(TransformerBlock, self).__init__()
        
        self.att = MultiHeadAttention(d_model, num_heads)
        self.ffn = keras.Sequential([
            layers.Dense(dff, activation='relu'),
            layers.Dense(d_model)
        ])
        
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)
    
    def call(self, x, training, mask=None):
        attn_output, _ = self.att(x, x, x, mask)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(x + attn_output)
        
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        out2 = self.layernorm2(out1 + ffn_output)
        
        return out2

class TokenAndPositionEmbedding(layers.Layer):
    def __init__(self, maxlen, vocab_size, embed_dim):
        super(TokenAndPositionEmbedding, self).__init__()
        self.token_emb = layers.Embedding(input_dim=vocab_size, output_dim=embed_dim)
        self.pos_emb = layers.Embedding(input_dim=maxlen, output_dim=embed_dim)
    
    def call(self, x):
        maxlen = tf.shape(x)[-1]
        positions = tf.range(start=0, limit=maxlen, delta=1)
        positions = self.pos_emb(positions)
        x = self.token_emb(x)
        return x + positions

# Create Transformer model for text classification
def create_transformer_classifier(vocab_size, maxlen, embed_dim, num_heads, ff_dim, num_classes):
    inputs = layers.Input(shape=(maxlen,))
    
    # Embedding layer
    embedding_layer = TokenAndPositionEmbedding(maxlen, vocab_size, embed_dim)
    x = embedding_layer(inputs)
    
    # Transformer block
    transformer_block = TransformerBlock(embed_dim, num_heads, ff_dim)
    x = transformer_block(x)
    
    # Global average pooling
    x = layers.GlobalAveragePooling1D()(x)
    x = layers.Dropout(0.1)(x)
    x = layers.Dense(20, activation="relu")(x)
    x = layers.Dropout(0.1)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)
    
    model = keras.Model(inputs=inputs, outputs=outputs)
    return model

print("=== Transformer for Text Classification ===")

# Generate sample text data
np.random.seed(42)
vocab_size = 1000
maxlen = 50
num_samples = 2000
num_classes = 2

# Create synthetic text data
X = np.random.randint(1, vocab_size, size=(num_samples, maxlen))
y = np.random.randint(0, num_classes, size=(num_samples,))
y = keras.utils.to_categorical(y, num_classes)

print(f"Data shape: {X.shape}")
print(f"Labels shape: {y.shape}")

# Split data
train_size = int(0.8 * num_samples)
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Model parameters
embed_dim = 32
num_heads = 2
ff_dim = 32

# Create model
model = create_transformer_classifier(
    vocab_size=vocab_size,
    maxlen=maxlen,
    embed_dim=embed_dim,
    num_heads=num_heads,
    ff_dim=ff_dim,
    num_classes=num_classes
)

model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

print("\\n=== Transformer Model Architecture ===")
model.summary()

# Train model
print("\\n=== Training Transformer ===")
history = model.fit(
    X_train, y_train,
    batch_size=32,
    epochs=10,
    validation_data=(X_test, y_test),
    verbose=1
)

# Evaluate
test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {test_accuracy:.4f}")

# Attention visualization (simplified)
print("\\n=== Attention Analysis ===")

# Create a model to extract attention weights
attention_model = keras.Model(
    inputs=model.input,
    outputs=model.layers[2].att.call(model.layers[1](model.input), 
                                    model.layers[1](model.input), 
                                    model.layers[1](model.input))[1]
)

# Get attention for a sample
sample_input = X_test[0:1]
attention_weights = attention_model.predict(sample_input, verbose=0)

print(f"Attention weights shape: {attention_weights.shape}")
print(f"Number of heads: {attention_weights.shape[1]}")
print(f"Sequence length: {attention_weights.shape[2]}")

# Simple attention analysis
for head in range(min(2, attention_weights.shape[1])):
    head_attention = attention_weights[0, head]
    max_attention_pos = np.unravel_index(np.argmax(head_attention), head_attention.shape)
    print(f"Head {head+1}: Max attention at position {max_attention_pos}")
    print(f"  Average attention: {np.mean(head_attention):.4f}")
    print(f"  Max attention: {np.max(head_attention):.4f}")

print("\\n=== Transformer Training Complete ===")

# Comparison with traditional models
print("\\n=== Model Comparison ===")

# Simple LSTM for comparison
lstm_model = keras.Sequential([
    layers.Embedding(vocab_size, embed_dim, input_length=maxlen),
    layers.LSTM(32),
    layers.Dense(num_classes, activation='softmax')
])

lstm_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
lstm_history = lstm_model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test), verbose=0)

lstm_accuracy = lstm_model.evaluate(X_test, y_test, verbose=0)[1]

print(f"Transformer Accuracy: {test_accuracy:.4f}")
print(f"LSTM Accuracy: {lstm_accuracy:.4f}")
print(f"Improvement: {((test_accuracy - lstm_accuracy) / lstm_accuracy * 100):+.2f}%")`,
        practiceLinks: [
          { name: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762' },
          { name: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/' },
          { name: 'Hugging Face Transformers', url: 'https://huggingface.co/transformers/' }
        ]
      }
    ]
  },
  mlops: {
    id: 'mlops',
    title: 'MLOps & Deployment',
    description: 'Model deployment, monitoring, and production machine learning systems',
    topics: [
      {
        id: 'model-deployment',
        title: 'Model Deployment',
        content: `# Model Deployment - From Development to Production

## What is Model Deployment?
**Model Deployment** is the process of making your trained machine learning model available for use in a production environment.

## Deployment Strategies:

### 1. Batch Deployment:
- **Process**: Run predictions on batches of data
- **Use Cases**: Daily reports, periodic analysis
- **Pros**: Simple, handles large volumes
- **Cons**: Not real-time, delayed results

### 2. Real-time Deployment:
- **Process**: Serve predictions via API endpoints
- **Use Cases**: Web applications, mobile apps
- **Pros**: Immediate results, interactive
- **Cons**: Higher complexity, latency concerns

### 3. Edge Deployment:
- **Process**: Deploy models on edge devices
- **Use Cases**: IoT devices, mobile applications
- **Pros**: Low latency, offline capability
- **Cons**: Resource constraints, model size limits

## Deployment Platforms:

### Cloud Platforms:
- **AWS SageMaker**: End-to-end ML platform
- **Google Cloud AI Platform**: Scalable ML services
- **Azure ML**: Microsoft's ML platform
- **Heroku**: Simple web app deployment

### Model Serving Frameworks:
- **Flask/FastAPI**: Python web frameworks
- **TensorFlow Serving**: High-performance serving
- **MLflow**: End-to-end ML lifecycle management

## Best Practices:

### 1. Model Versioning:
- **Track Models**: Version control for models
- **A/B Testing**: Compare model versions
- **Rollback**: Quick rollback to previous versions

### 2. Monitoring:
- **Performance Metrics**: Accuracy, latency, throughput
- **Data Drift**: Monitor input data changes
- **Model Drift**: Track model performance over time

### 3. Security:
- **Authentication**: Secure API endpoints
- **Data Privacy**: Protect sensitive data
- **Model Protection**: Prevent model theft`,
        codeExample: `# Model Deployment with Flask API
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification
from sklearn.metrics import accuracy_score
import joblib
from datetime import datetime
import os

class ModelDeployment:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.model_version = "1.0.0"
        
    def train_model(self):
        print("=== Training Model for Deployment ===")
        
        # Generate sample data
        X, y = make_classification(n_samples=1000, n_features=10, 
                                 n_informative=8, random_state=42)
        
        self.feature_names = [f'feature_{i}' for i in range(X.shape[1])]
        
        # Split and scale data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Model trained with accuracy: {accuracy:.4f}")
        return accuracy
    
    def save_model(self, model_dir="models"):
        os.makedirs(model_dir, exist_ok=True)
        joblib.dump(self.model, os.path.join(model_dir, "model.pkl"))
        joblib.dump(self.scaler, os.path.join(model_dir, "scaler.pkl"))
        
        metadata = {
            'version': self.model_version,
            'feature_names': self.feature_names,
            'model_type': 'RandomForestClassifier'
        }
        joblib.dump(metadata, os.path.join(model_dir, "metadata.pkl"))
        print(f"Model saved to {model_dir}")
    
    def load_model(self, model_dir="models"):
        try:
            self.model = joblib.load(os.path.join(model_dir, "model.pkl"))
            self.scaler = joblib.load(os.path.join(model_dir, "scaler.pkl"))
            metadata = joblib.load(os.path.join(model_dir, "metadata.pkl"))
            self.model_version = metadata['version']
            self.feature_names = metadata['feature_names']
            print(f"Model loaded successfully (version: {self.model_version})")
            return True
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return False
    
    def predict(self, features):
        try:
            if isinstance(features, list):
                features = np.array(features).reshape(1, -1)
            
            if features.shape[1] != len(self.feature_names):
                raise ValueError(f"Expected {len(self.feature_names)} features")
            
            features_scaled = self.scaler.transform(features)
            prediction = self.model.predict(features_scaled)[0]
            probability = self.model.predict_proba(features_scaled)[0]
            
            return {
                'prediction': int(prediction),
                'probability': {
                    'class_0': float(probability[0]),
                    'class_1': float(probability[1])
                },
                'confidence': float(max(probability))
            }
        except Exception as e:
            raise ValueError(f"Prediction error: {str(e)}")

# Initialize deployment
deployment = ModelDeployment()

# Train and save model
if not os.path.exists("models/model.pkl"):
    deployment.train_model()
    deployment.save_model()
else:
    deployment.load_model()

# Create Flask app
app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_version': deployment.model_version,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data or 'features' not in data:
            return jsonify({'error': 'Features not found'}), 400
        
        result = deployment.predict(data['features'])
        return jsonify({
            'success': True,
            'prediction': result['prediction'],
            'probability': result['probability'],
            'confidence': result['confidence'],
            'model_version': deployment.model_version
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/model/info', methods=['GET'])
def model_info():
    return jsonify({
        'model_version': deployment.model_version,
        'model_type': 'RandomForestClassifier',
        'feature_names': deployment.feature_names,
        'features_count': len(deployment.feature_names)
    })

if __name__ == '__main__':
    print("=== Model Deployment Server ===")
    print(f"Model version: {deployment.model_version}")
    print("\\nAvailable endpoints:")
    print("  GET  /health - Health check")
    print("  POST /predict - Make prediction")
    print("  GET  /model/info - Model information")
    print("\\nStarting server on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)`,
        practiceLinks: [
          { name: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html' },
          { name: 'Flask ML API Tutorial', url: 'https://towardsdatascience.com/deploying-ml-models-with-flask' },
          { name: 'Docker for ML', url: 'https://www.docker.com/blog/containerized-python-development/' }
        ]
      },
      {
        id: 'model-monitoring',
        title: 'Model Monitoring & Maintenance',
        content: `# Model Monitoring & Maintenance - Keeping Models Healthy

## Why Monitor ML Models?
**Model Monitoring** ensures your deployed models continue to perform well over time and alerts you to potential issues before they impact business outcomes.

## Key Monitoring Areas:

### 1. Model Performance:
- **Accuracy Metrics**: Track prediction accuracy over time
- **Business Metrics**: Revenue impact, user engagement
- **Latency**: Response time monitoring
- **Throughput**: Requests per second capacity

### 2. Data Quality:
- **Missing Values**: Monitor for incomplete data
- **Data Types**: Ensure correct data formats
- **Range Validation**: Check for out-of-range values
- **Schema Changes**: Detect structural changes

### 3. Data Drift:
- **Feature Drift**: Changes in input feature distributions
- **Concept Drift**: Changes in target variable relationships
- **Covariate Shift**: Changes in feature correlations
- **Label Shift**: Changes in target distribution

## Monitoring Techniques:

### Statistical Methods:
- **Kolmogorov-Smirnov Test**: Compare distributions
- **Population Stability Index (PSI)**: Measure feature stability
- **Jensen-Shannon Divergence**: Quantify distribution differences
- **Chi-Square Test**: Test categorical feature changes

### Machine Learning Approaches:
- **Adversarial Validation**: Train classifier to detect drift
- **Reconstruction Error**: Use autoencoders for anomaly detection
- **Uncertainty Estimation**: Monitor prediction confidence

## Alerting Systems:

### Alert Types:
- **Performance Degradation**: Accuracy drops below threshold
- **Data Drift**: Significant distribution changes
- **System Issues**: High latency, errors, downtime
- **Business Impact**: Revenue or conversion drops

### Alert Channels:
- **Email**: Detailed reports and summaries
- **Slack/Teams**: Real-time notifications
- **PagerDuty**: Critical incident management
- **Dashboards**: Visual monitoring interfaces`,
        codeExample: `# Model Monitoring System
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.metrics import accuracy_score, precision_score, recall_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class ModelMonitor:
    def __init__(self, model, reference_data, feature_names):
        self.model = model
        self.reference_data = reference_data
        self.feature_names = feature_names
        self.performance_history = []
        self.drift_history = []
        self.alerts = []
        
    def calculate_psi(self, reference, current, bins=10):
        """Calculate Population Stability Index"""
        def psi_score(ref_dist, cur_dist):
            psi = 0
            for i in range(len(ref_dist)):
                if cur_dist[i] == 0:
                    cur_dist[i] = 0.0001
                if ref_dist[i] == 0:
                    ref_dist[i] = 0.0001
                psi += (cur_dist[i] - ref_dist[i]) * np.log(cur_dist[i] / ref_dist[i])
            return psi
        
        # Create bins based on reference data
        _, bin_edges = np.histogram(reference, bins=bins)
        
        # Calculate distributions
        ref_dist, _ = np.histogram(reference, bins=bin_edges, density=True)
        cur_dist, _ = np.histogram(current, bins=bin_edges, density=True)
        
        # Normalize to probabilities
        ref_dist = ref_dist / np.sum(ref_dist)
        cur_dist = cur_dist / np.sum(cur_dist)
        
        return psi_score(ref_dist, cur_dist)
    
    def detect_data_drift(self, current_data, threshold=0.1):
        """Detect data drift using PSI and statistical tests"""
        drift_results = {}
        
        for i, feature in enumerate(self.feature_names):
            ref_feature = self.reference_data[:, i]
            cur_feature = current_data[:, i]
            
            # PSI calculation
            psi = self.calculate_psi(ref_feature, cur_feature)
            
            # KS test
            ks_stat, ks_p_value = stats.ks_2samp(ref_feature, cur_feature)
            
            drift_results[feature] = {
                'psi': psi,
                'ks_statistic': ks_stat,
                'ks_p_value': ks_p_value,
                'drift_detected': psi > threshold or ks_p_value < 0.05
            }
        
        return drift_results
    
    def monitor_performance(self, X_current, y_current, y_pred):
        """Monitor model performance metrics"""
        metrics = {
            'timestamp': datetime.now(),
            'accuracy': accuracy_score(y_current, y_pred),
            'precision': precision_score(y_current, y_pred, average='weighted'),
            'recall': recall_score(y_current, y_pred, average='weighted'),
            'sample_size': len(y_current)
        }
        
        self.performance_history.append(metrics)
        return metrics
    
    def check_alerts(self, current_metrics, drift_results, 
                    accuracy_threshold=0.8, drift_threshold=0.1):
        """Check for alert conditions"""
        alerts = []
        
        # Performance alerts
        if current_metrics['accuracy'] < accuracy_threshold:
            alerts.append({
                'type': 'performance',
                'severity': 'high',
                'message': f"Accuracy dropped to {current_metrics['accuracy']:.3f}",
                'timestamp': datetime.now()
            })
        
        # Drift alerts
        drifted_features = [f for f, r in drift_results.items() if r['drift_detected']]
        if drifted_features:
            alerts.append({
                'type': 'data_drift',
                'severity': 'medium',
                'message': f"Data drift detected in features: {', '.join(drifted_features)}",
                'timestamp': datetime.now()
            })
        
        self.alerts.extend(alerts)
        return alerts
    
    def generate_report(self):
        """Generate monitoring report"""
        if not self.performance_history:
            return "No monitoring data available"
        
        latest_metrics = self.performance_history[-1]
        
        report = f"""
=== Model Monitoring Report ===
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Latest Performance:
  Accuracy: {latest_metrics['accuracy']:.4f}
  Precision: {latest_metrics['precision']:.4f}
  Recall: {latest_metrics['recall']:.4f}
  Sample Size: {latest_metrics['sample_size']}

Performance Trend (last 5 periods):
"""
        
        for i, metrics in enumerate(self.performance_history[-5:]):
            report += f"  Period {i+1}: Accuracy = {metrics['accuracy']:.4f}\n"
        
        if self.alerts:
            report += f"\nActive Alerts: {len(self.alerts)}\n"
            for alert in self.alerts[-3:]:  # Show last 3 alerts
                report += f"  [{alert['severity'].upper()}] {alert['message']}\n"
        
        return report

# Demonstration
print("=== Model Monitoring System Demo ===")

# Generate reference data
np.random.seed(42)
X_ref, y_ref = make_classification(n_samples=1000, n_features=5, random_state=42)
feature_names = [f'feature_{i}' for i in range(5)]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_ref, y_ref)

# Initialize monitor
monitor = ModelMonitor(model, X_ref, feature_names)

print(f"Monitoring system initialized with {len(X_ref)} reference samples")

# Simulate monitoring over time
print("\n=== Simulating 5 monitoring periods ===")

for period in range(1, 6):
    print(f"\nPeriod {period}:")
    
    # Generate current data (with increasing drift)
    drift_factor = period * 0.1
    X_current = X_ref + np.random.normal(0, drift_factor, X_ref.shape)
    y_current = model.predict(X_current)
    
    # Add some noise to simulate real performance degradation
    if period > 3:
        noise_indices = np.random.choice(len(y_current), size=int(0.1 * len(y_current)))
        y_current[noise_indices] = 1 - y_current[noise_indices]
    
    y_true = model.predict(X_ref)  # Simulate true labels
    
    # Monitor performance
    performance = monitor.monitor_performance(X_current, y_true, y_current)
    print(f"  Accuracy: {performance['accuracy']:.4f}")
    
    # Detect drift
    drift_results = monitor.detect_data_drift(X_current)
    drifted_features = [f for f, r in drift_results.items() if r['drift_detected']]
    print(f"  Drift detected in: {drifted_features if drifted_features else 'None'}")
    
    # Check alerts
    alerts = monitor.check_alerts(performance, drift_results)
    if alerts:
        print(f"  Alerts: {len(alerts)} new alerts")
        for alert in alerts:
            print(f"    [{alert['severity'].upper()}] {alert['message']}")

# Generate final report
print("\n" + monitor.generate_report())

print("\n=== Monitoring Demo Complete ===")`,
        practiceLinks: [
          { name: 'Evidently AI', url: 'https://evidentlyai.com/' },
          { name: 'MLflow Model Registry', url: 'https://mlflow.org/docs/latest/model-registry.html' },
          { name: 'Data Drift Detection', url: 'https://towardsdatascience.com/data-drift-detection-in-ml' }
        ]
      },
      {
        id: 'ci-cd-ml',
        title: 'CI/CD for Machine Learning',
        content: `# CI/CD for Machine Learning - Automating ML Workflows

## What is ML CI/CD?
**ML CI/CD** extends traditional software CI/CD practices to machine learning, automating the entire ML lifecycle from data validation to model deployment.

## ML CI/CD Components:

### 1. Continuous Integration (CI):
- **Code Testing**: Unit tests for ML code
- **Data Validation**: Automated data quality checks
- **Model Testing**: Performance and bias testing
- **Pipeline Testing**: End-to-end workflow validation

### 2. Continuous Deployment (CD):
- **Model Packaging**: Containerization and versioning
- **Automated Deployment**: Deploy to staging/production
- **Rollback Mechanisms**: Quick reversion capabilities
- **Blue-Green Deployment**: Zero-downtime deployments

### 3. Continuous Training (CT):
- **Automated Retraining**: Trigger on data/performance changes
- **Hyperparameter Tuning**: Automated optimization
- **Model Selection**: Compare and select best models
- **Feature Engineering**: Automated feature updates

## ML Pipeline Stages:

### 1. Data Pipeline:
- **Data Ingestion**: Automated data collection
- **Data Validation**: Schema and quality checks
- **Data Preprocessing**: Cleaning and transformation
- **Feature Store**: Centralized feature management

### 2. Training Pipeline:
- **Experiment Tracking**: Log metrics and artifacts
- **Model Training**: Automated training jobs
- **Model Validation**: Performance evaluation
- **Model Registry**: Version and metadata management

### 3. Deployment Pipeline:
- **Model Packaging**: Docker containers
- **Infrastructure Provisioning**: Cloud resources
- **Service Deployment**: API endpoints
- **Monitoring Setup**: Logging and alerting

## Tools and Platforms:

### CI/CD Tools:
- **GitHub Actions**: Git-based workflows
- **Jenkins**: Traditional CI/CD server
- **GitLab CI**: Integrated DevOps platform
- **Azure DevOps**: Microsoft's DevOps suite

### ML-Specific Tools:
- **MLflow**: End-to-end ML lifecycle
- **Kubeflow**: Kubernetes-native ML workflows
- **DVC**: Data version control
- **CML**: Continuous Machine Learning

### Cloud Platforms:
- **AWS SageMaker Pipelines**: Amazon's ML workflows
- **Google Cloud AI Platform**: Google's ML services
- **Azure ML Pipelines**: Microsoft's ML platform`,
        codeExample: `# ML CI/CD Pipeline Implementation
import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.datasets import make_classification
import yaml
from datetime import datetime

class MLPipeline:
    def __init__(self, config_path="ml_config.yaml"):
        self.config = self.load_config(config_path)
        self.model = None
        self.metrics = {}
        self.artifacts = {}
        
    def load_config(self, config_path):
        """Load pipeline configuration"""
        default_config = {
            'data': {
                'n_samples': 1000,
                'n_features': 10,
                'test_size': 0.2,
                'random_state': 42
            },
            'model': {
                'type': 'RandomForestClassifier',
                'n_estimators': 100,
                'random_state': 42
            },
            'validation': {
                'min_accuracy': 0.8,
                'max_features': 20
            },
            'deployment': {
                'model_name': 'ml_model',
                'version': '1.0.0'
            }
        }
        
        try:
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
            return {**default_config, **config}
        except FileNotFoundError:
            print(f"Config file {config_path} not found, using defaults")
            return default_config
    
    def validate_data(self, X, y):
        """Data validation checks"""
        checks = {
            'data_shape_valid': True,
            'no_missing_values': True,
            'feature_count_valid': True,
            'target_distribution_valid': True
        }
        
        # Check data shape
        if len(X) == 0 or len(y) == 0:
            checks['data_shape_valid'] = False
        
        # Check for missing values
        if np.isnan(X).any() or np.isnan(y).any():
            checks['no_missing_values'] = False
        
        # Check feature count
        if X.shape[1] > self.config['validation']['max_features']:
            checks['feature_count_valid'] = False
        
        # Check target distribution
        unique_classes = np.unique(y)
        if len(unique_classes) < 2:
            checks['target_distribution_valid'] = False
        
        return checks
    
    def prepare_data(self):
        """Data preparation stage"""
        print("=== Data Preparation Stage ===")
        
        # Generate synthetic data (in real scenario, load from source)
        X, y = make_classification(
            n_samples=self.config['data']['n_samples'],
            n_features=self.config['data']['n_features'],
            random_state=self.config['data']['random_state']
        )
        
        # Validate data
        validation_results = self.validate_data(X, y)
        print(f"Data validation: {validation_results}")
        
        if not all(validation_results.values()):
            raise ValueError("Data validation failed")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, 
            test_size=self.config['data']['test_size'],
            random_state=self.config['data']['random_state']
        )
        
        print(f"Training samples: {len(X_train)}")
        print(f"Test samples: {len(X_test)}")
        
        return X_train, X_test, y_train, y_test
    
    def train_model(self, X_train, y_train):
        """Model training stage"""
        print("\n=== Model Training Stage ===")
        
        # Initialize model based on config
        if self.config['model']['type'] == 'RandomForestClassifier':
            self.model = RandomForestClassifier(
                n_estimators=self.config['model']['n_estimators'],
                random_state=self.config['model']['random_state']
            )
        
        # Train model
        self.model.fit(X_train, y_train)
        print(f"Model trained: {type(self.model).__name__}")
        
        return self.model
    
    def validate_model(self, X_test, y_test):
        """Model validation stage"""
        print("\n=== Model Validation Stage ===")
        
        # Make predictions
        y_pred = self.model.predict(X_test)
        
        # Calculate metrics
        accuracy = accuracy_score(y_test, y_pred)
        
        self.metrics = {
            'accuracy': accuracy,
            'timestamp': datetime.now().isoformat(),
            'test_samples': len(y_test)
        }
        
        print(f"Model accuracy: {accuracy:.4f}")
        
        # Validation checks
        if accuracy < self.config['validation']['min_accuracy']:
            raise ValueError(f"Model accuracy {accuracy:.4f} below threshold {self.config['validation']['min_accuracy']}")
        
        print("Model validation passed")
        return self.metrics
    
    def package_model(self):
        """Model packaging stage"""
        print("\n=== Model Packaging Stage ===")
        
        # Create artifacts directory
        os.makedirs('artifacts', exist_ok=True)
        
        # Save model
        model_path = 'artifacts/model.pkl'
        joblib.dump(self.model, model_path)
        
        # Save metadata
        metadata = {
            'model_name': self.config['deployment']['model_name'],
            'version': self.config['deployment']['version'],
            'metrics': self.metrics,
            'config': self.config,
            'created_at': datetime.now().isoformat()
        }
        
        metadata_path = 'artifacts/metadata.json'
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        self.artifacts = {
            'model_path': model_path,
            'metadata_path': metadata_path
        }
        
        print(f"Model packaged: {model_path}")
        print(f"Metadata saved: {metadata_path}")
        
        return self.artifacts
    
    def run_pipeline(self):
        """Run complete ML pipeline"""
        try:
            print("=== Starting ML CI/CD Pipeline ===")
            
            # Data preparation
            X_train, X_test, y_train, y_test = self.prepare_data()
            
            # Model training
            self.train_model(X_train, y_train)
            
            # Model validation
            self.validate_model(X_test, y_test)
            
            # Model packaging
            self.package_model()
            
            print("\n=== Pipeline Completed Successfully ===")
            return True
            
        except Exception as e:
            print(f"\n=== Pipeline Failed: {str(e)} ===")
            return False

# GitHub Actions Workflow Example
github_workflow = """
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  ml-pipeline:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.8
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    
    - name: Run data validation
      run: |
        python -m pytest tests/test_data.py
    
    - name: Run model training
      run: |
        python ml_pipeline.py
    
    - name: Run model tests
      run: |
        python -m pytest tests/test_model.py
    
    - name: Deploy to staging
      if: github.ref == 'refs/heads/main'
      run: |
        python deploy.py --env staging
"""

# Docker configuration
dockerfile_content = """
# Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
"""

# Run pipeline demonstration
if __name__ == "__main__":
    pipeline = MLPipeline()
    success = pipeline.run_pipeline()
    
    if success:
        print("\n=== Pipeline Artifacts ===")
        for name, path in pipeline.artifacts.items():
            print(f"{name}: {path}")
        
        print("\n=== Final Metrics ===")
        for metric, value in pipeline.metrics.items():
            print(f"{metric}: {value}")
    
    print("\n=== CI/CD Configuration Examples ===")
    print("\nGitHub Actions Workflow:")
    print(github_workflow)
    
    print("\nDockerfile:")
    print(dockerfile_content)`,
        practiceLinks: [
          { name: 'MLOps Principles', url: 'https://ml-ops.org/' },
          { name: 'GitHub Actions for ML', url: 'https://github.com/features/actions' },
          { name: 'Kubeflow Pipelines', url: 'https://www.kubeflow.org/docs/components/pipelines/' }
        ]
      },
      {
        id: 'model-versioning',
        title: 'Model Versioning & Registry',
        content: `# Model Versioning & Registry - Managing ML Assets

## What is Model Versioning?
**Model Versioning** is the practice of tracking different versions of machine learning models, their metadata, and associated artifacts throughout the ML lifecycle.

## Why Version Models?

### Benefits:
- **Reproducibility**: Recreate exact model results
- **Collaboration**: Team members can share models
- **Rollback**: Quickly revert to previous versions
- **Comparison**: Compare model performance across versions
- **Compliance**: Audit trail for regulatory requirements

### Challenges Without Versioning:
- **Model Confusion**: Which model is in production?
- **Lost Experiments**: Cannot reproduce results
- **Deployment Issues**: Wrong model versions deployed
- **Collaboration Problems**: Team conflicts over models

## Model Registry Components:

### 1. Model Metadata:
- **Version Information**: Semantic versioning (v1.2.3)
- **Performance Metrics**: Accuracy, precision, recall
- **Training Data**: Dataset version and characteristics
- **Hyperparameters**: Model configuration
- **Dependencies**: Library versions and requirements

### 2. Model Artifacts:
- **Model Files**: Serialized model objects
- **Preprocessing**: Feature transformers and scalers
- **Code**: Training and inference scripts
- **Documentation**: Model cards and descriptions

### 3. Lifecycle Management:
- **Staging**: Development → Staging → Production
- **Approval Workflows**: Review and approval processes
- **Deployment Tracking**: Which version is where
- **Retirement**: Deprecating old models

## Versioning Strategies:

### 1. Semantic Versioning:
- **Major.Minor.Patch** (e.g., 2.1.3)
- **Major**: Breaking changes or new architecture
- **Minor**: New features or improvements
- **Patch**: Bug fixes or small updates

### 2. Time-based Versioning:
- **YYYY.MM.DD** format
- **Advantages**: Clear chronological order
- **Use Case**: Regular retraining schedules

### 3. Git-based Versioning:
- **Commit Hash**: Link to exact code version
- **Branch/Tag**: Feature or release branches
- **Integration**: Works with code versioning

## Model Registry Tools:

### Open Source:
- **MLflow Model Registry**: Comprehensive ML lifecycle
- **DVC**: Data and model version control
- **ModelDB**: Model metadata management
- **Pachyderm**: Data-driven pipelines

### Commercial:
- **AWS SageMaker Model Registry**: Amazon's solution
- **Azure ML Model Registry**: Microsoft's platform
- **Google AI Platform**: Google's model management
- **Neptune**: Experiment and model tracking`,
        codeExample: `# Model Registry Implementation
import os
import json
import joblib
import hashlib
import shutil
from datetime import datetime
from pathlib import Path
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

class ModelRegistry:
    def __init__(self, registry_path="model_registry"):
        self.registry_path = Path(registry_path)
        self.registry_path.mkdir(exist_ok=True)
        self.models_path = self.registry_path / "models"
        self.models_path.mkdir(exist_ok=True)
        self.metadata_file = self.registry_path / "registry.json"
        self.registry_data = self.load_registry()
    
    def load_registry(self):
        """Load existing registry data"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r') as f:
                return json.load(f)
        return {'models': {}, 'versions': {}}
    
    def save_registry(self):
        """Save registry data to file"""
        with open(self.metadata_file, 'w') as f:
            json.dump(self.registry_data, f, indent=2)
    
    def generate_model_hash(self, model_data):
        """Generate unique hash for model"""
        return hashlib.md5(str(model_data).encode()).hexdigest()[:8]
    
    def register_model(self, model_name, model, metadata=None):
        """Register a new model"""
        if model_name not in self.registry_data['models']:
            self.registry_data['models'][model_name] = {
                'created_at': datetime.now().isoformat(),
                'description': metadata.get('description', '') if metadata else '',
                'versions': []
            }
        
        # Generate version
        version_count = len(self.registry_data['models'][model_name]['versions'])
        version = f"v{version_count + 1}.0.0"
        
        # Create model directory
        model_dir = self.models_path / model_name / version
        model_dir.mkdir(parents=True, exist_ok=True)
        
        # Save model
        model_path = model_dir / "model.pkl"
        joblib.dump(model, model_path)
        
        # Generate model hash
        model_hash = self.generate_model_hash(str(model.get_params()))
        
        # Create version metadata
        version_metadata = {
            'version': version,
            'model_hash': model_hash,
            'created_at': datetime.now().isoformat(),
            'model_path': str(model_path),
            'status': 'registered',
            'metrics': metadata.get('metrics', {}) if metadata else {},
            'hyperparameters': model.get_params(),
            'tags': metadata.get('tags', []) if metadata else []
        }
        
        # Add to registry
        self.registry_data['models'][model_name]['versions'].append(version)
        self.registry_data['versions'][f"{model_name}:{version}"] = version_metadata
        
        self.save_registry()
        print(f"Model '{model_name}' version '{version}' registered successfully")
        return version
    
    def get_model(self, model_name, version=None):
        """Retrieve a model from registry"""
        if model_name not in self.registry_data['models']:
            raise ValueError(f"Model '{model_name}' not found")
        
        if version is None:
            # Get latest version
            versions = self.registry_data['models'][model_name]['versions']
            if not versions:
                raise ValueError(f"No versions found for model '{model_name}'")
            version = versions[-1]
        
        version_key = f"{model_name}:{version}"
        if version_key not in self.registry_data['versions']:
            raise ValueError(f"Version '{version}' not found for model '{model_name}'")
        
        metadata = self.registry_data['versions'][version_key]
        model = joblib.load(metadata['model_path'])
        
        return model, metadata
    
    def list_models(self):
        """List all registered models"""
        return list(self.registry_data['models'].keys())
    
    def list_versions(self, model_name):
        """List all versions of a model"""
        if model_name not in self.registry_data['models']:
            return []
        return self.registry_data['models'][model_name]['versions']
    
    def promote_model(self, model_name, version, stage):
        """Promote model to different stage"""
        version_key = f"{model_name}:{version}"
        if version_key not in self.registry_data['versions']:
            raise ValueError(f"Version '{version}' not found")
        
        valid_stages = ['staging', 'production', 'archived']
        if stage not in valid_stages:
            raise ValueError(f"Invalid stage. Must be one of {valid_stages}")
        
        self.registry_data['versions'][version_key]['status'] = stage
        self.registry_data['versions'][version_key]['promoted_at'] = datetime.now().isoformat()
        
        self.save_registry()
        print(f"Model '{model_name}' version '{version}' promoted to '{stage}'")
    
    def compare_models(self, model_name, version1, version2):
        """Compare two model versions"""
        _, metadata1 = self.get_model(model_name, version1)
        _, metadata2 = self.get_model(model_name, version2)
        
        comparison = {
            'version1': version1,
            'version2': version2,
            'metrics_comparison': {},
            'hyperparameter_changes': {}
        }
        
        # Compare metrics
        metrics1 = metadata1.get('metrics', {})
        metrics2 = metadata2.get('metrics', {})
        
        for metric in set(metrics1.keys()) | set(metrics2.keys()):
            comparison['metrics_comparison'][metric] = {
                'version1': metrics1.get(metric, 'N/A'),
                'version2': metrics2.get(metric, 'N/A'),
                'improvement': metrics2.get(metric, 0) - metrics1.get(metric, 0) if metric in metrics1 and metric in metrics2 else 'N/A'
            }
        
        # Compare hyperparameters
        params1 = metadata1.get('hyperparameters', {})
        params2 = metadata2.get('hyperparameters', {})
        
        for param in set(params1.keys()) | set(params2.keys()):
            if params1.get(param) != params2.get(param):
                comparison['hyperparameter_changes'][param] = {
                    'version1': params1.get(param, 'N/A'),
                    'version2': params2.get(param, 'N/A')
                }
        
        return comparison
    
    def get_registry_stats(self):
        """Get registry statistics"""
        stats = {
            'total_models': len(self.registry_data['models']),
            'total_versions': len(self.registry_data['versions']),
            'models_by_stage': {'registered': 0, 'staging': 0, 'production': 0, 'archived': 0}
        }
        
        for version_data in self.registry_data['versions'].values():
            stage = version_data.get('status', 'registered')
            stats['models_by_stage'][stage] += 1
        
        return stats

# Demonstration
print("=== Model Registry Demo ===")

# Initialize registry
registry = ModelRegistry()

# Generate sample data and train models
np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train first model version
print("\n=== Training Model v1 ===")
model_v1 = RandomForestClassifier(n_estimators=50, random_state=42)
model_v1.fit(X_train, y_train)
y_pred_v1 = model_v1.predict(X_test)
accuracy_v1 = accuracy_score(y_test, y_pred_v1)

metadata_v1 = {
    'description': 'Initial random forest model',
    'metrics': {'accuracy': accuracy_v1, 'n_estimators': 50},
    'tags': ['baseline', 'random_forest']
}

version_v1 = registry.register_model('customer_churn_model', model_v1, metadata_v1)

# Train improved model version
print("\n=== Training Model v2 ===")
model_v2 = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model_v2.fit(X_train, y_train)
y_pred_v2 = model_v2.predict(X_test)
accuracy_v2 = accuracy_score(y_test, y_pred_v2)

metadata_v2 = {
    'description': 'Improved random forest with more trees',
    'metrics': {'accuracy': accuracy_v2, 'n_estimators': 100},
    'tags': ['improved', 'random_forest']
}

version_v2 = registry.register_model('customer_churn_model', model_v2, metadata_v2)

# Registry operations
print("\n=== Registry Operations ===")
print(f"Registered models: {registry.list_models()}")
print(f"Model versions: {registry.list_versions('customer_churn_model')}")

# Promote model to staging
registry.promote_model('customer_churn_model', version_v2, 'staging')

# Compare models
print("\n=== Model Comparison ===")
comparison = registry.compare_models('customer_churn_model', version_v1, version_v2)
print(f"Comparing {version_v1} vs {version_v2}:")
for metric, values in comparison['metrics_comparison'].items():
    print(f"  {metric}: {values['version1']:.4f} → {values['version2']:.4f} (Δ: {values['improvement']:.4f})")

# Registry statistics
print("\n=== Registry Statistics ===")
stats = registry.get_registry_stats()
for key, value in stats.items():
    print(f"{key}: {value}")

# Load model for inference
print("\n=== Model Inference ===")
loaded_model, model_metadata = registry.get_model('customer_churn_model')  # Latest version
sample_prediction = loaded_model.predict(X_test[:5])
print(f"Sample predictions: {sample_prediction}")
print(f"Model version: {model_metadata['version']}")
print(f"Model accuracy: {model_metadata['metrics']['accuracy']:.4f}")

print("\n=== Registry Demo Complete ===")`,
        practiceLinks: [
          { name: 'MLflow Model Registry', url: 'https://mlflow.org/docs/latest/model-registry.html' },
          { name: 'DVC Model Registry', url: 'https://dvc.org/doc/use-cases/model-registry' },
          { name: 'Model Versioning Best Practices', url: 'https://neptune.ai/blog/model-versioning' }
        ]
      }
    ]
  }
};