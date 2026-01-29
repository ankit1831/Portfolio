🧠 Computer Vision & Medical AI
Brain Tumor Detection System (Featured Project)
Multi-class MRI tumor classification with 94%+ accuracy using CNNs

Problem: Classify brain MRI images (glioma, meningioma, pituitary, no tumor)

Dataset: 3,000+ T1-weighted MRI scans with augmentation pipeline

Architecture:

Custom CNN: Conv2D → MaxPool → Dropout → Dense layers

Transfer Learning: VGG16/ResNet50 fine-tuned

Preprocessing: Resize 150x150, normalization, CLAHE enhancement

Performance Metrics:

text
Test Accuracy: 94.23% (1324/1405 images)
Validation Accuracy: 91-94%
F1-Score (weighted): 0.94
Class-wise Precision: [0.95 no_tumor, 0.93 glioma, 0.92 meningioma, 0.91 pituitary]
Confusion Matrix & ROC curves implemented
Deployment: Flask web app → image upload → prediction + confidence heatmap

Tech: TensorFlow/Keras, OpenCV, Flask, Bootstrap

GitHub

💊 Healthcare & Web Applications
Heal-Bridge AI (Live Platform - Production Ready)
Healthcare platform with AI symptom checker & appointment system

Core Features:

Symptom analysis & preliminary health assessment

Doctor appointment booking across multiple specialties

Medical record management & prescription upload

Multi-language support (English, Hindi, regional languages)

AI Components: AI-powered health insights, prescription scanner (handwriting OCR)

Architecture: Full-stack web app with cloud deployment

Status: Live & actively maintained (upcoming: teleconsultation, EHR integration)

Live Demo: https://heal-bridge-ai.onrender.com/

Tech Stack: Python/Flask/Streamlit, Render hosting

GitHub
​

🤖 Generative AI & LLMs
Groq-Powered LLM Chatbot
Ultra-fast conversational AI with model switching capabilities

Features:

Model selector: Llama3-70B/8B, Mixtral, Gemma, Gemma2

Streaming responses (<300ms latency)

Conversation history & clear chat functionality

Performance: Groq Cloud optimized inference - production-grade speed

Tech: Streamlit, Groq API, async Python

GitHub
​

📊 Machine Learning Pipelines
Student Performance Prediction (Complete ML Pipeline)
Academic success predictor with Flask deployment & EDA dashboards

text
Dataset: 1,000+ student records (study time, demographics, family background)
Preprocessing: Outlier removal, encoding, SMOTE balancing
Models: Linear Regression, Decision Tree, Random Forest, KNN, SVM, XGBoost
Best Model (Random Forest):

text
Accuracy: 92.5%
F1-Score: 0.91
RMSE (Grade): 1.18
Feature Importance: study_time(28%), failures(22%), family_edu(18%)
Web App: Input form → prediction + probability visualization

Tech: Pandas, Scikit-learn, Seaborn/Matplotlib, Flask

GitHub

Food Delivery Time Prediction (Regression Optimization)
ETA predictor for delivery platforms (RMSE: 3.2 minutes)

Features: 18 variables (distance, weather, traffic, restaurant rating, order volume)

Models Compared:

text
XGBoost: RMSE 3.2min, R² 0.87
Random Forest: RMSE 3.5min, R² 0.85
Linear Regression: RMSE 4.1min, R² 0.78
Insights: Weather & peak hours most impactful (25% variance explained)

Tech: Pandas, XGBoost, Featuretools

GitHub
​

Customer Churn Prediction (Business Analytics)
Telco churn classifier with SHAP explainability (AUC: 0.95)

text
Dataset: 7,000+ customer records (tenure, charges, services)
Preprocessing: SMOTE (48%→50% churn balance), feature selection
Ensemble: XGBoost + Logistic Regression
Metrics:

text
Accuracy: 93.2%
Precision (Churn): 0.91
Recall (Churn): 0.89
F1: 0.90
AUC-ROC: 0.95
SHAP Analysis: Contract type & monthly charges top predictors

Tech: Scikit-learn, XGBoost, SHAP, Plotly

GitHub

🔬 Research Projects
Gait Recognition System (CASIA-B Dataset)
Biometric identification via walking patterns - cross-view challenge

Dataset: 124 subjects × 11 angles × 3 clothing × 10 sequences

Pipeline: CNN (spatial) → LSTM (temporal) → softmax classifier

Metrics (Ongoing):

text
Same-view Rank-1: 92.4%
Cross-view Rank-1: 78.2%
mAP: 85% (multi-shot)
Research Focus: View-invariant features, clothing robustness

Tech: PyTorch, OpenCV, CASIA-B preprocessing scripts

[Active Development]