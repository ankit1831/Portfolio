# QA Seed — Ankit Sharma (2027 Batch, 3rd Year)

Tone: Formal, confident, technical. Use concise answers with evidence (metrics, design choices, tradeoffs).

---

## 30-second intros (role-tailored)

### Intro — ML Engineer (30s)

I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). I build end-to-end ML systems with measurable outcomes—most notably a brain MRI tumor classifier with **96%+ test accuracy** and a weighted F1 of 0.94—and I’ve deployed projects using Flask/Streamlit. I also worked as an AI Research Intern at CodingJr (Apr–Jul 2025) on GenAI/chatbots and evaluation pipelines. I’m looking for ML Engineer roles where I can combine strong fundamentals, disciplined evaluation, and practical deployment to ship reliable ML features.

### Intro — Data Scientist (30s)

I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). My strength is applying ML rigor to real problems: I compare models, choose metrics correctly, handle imbalanced data (e.g., SMOTE in churn), and translate results into actionable insights with explainability tools like SHAP (AUC 0.95 on churn). I’ve also shipped working apps and dashboards using Flask/Streamlit, and I’m targeting Data Scientist roles where I can deliver both strong predictive performance and clear business interpretation.

### Intro — Software Engineer (30s)

I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). I enjoy building software systems that integrate ML/AI into usable products—like deployed Flask/Streamlit applications and a portfolio chatbot backed by retrieval over structured project documentation. During my AI Research internship at CodingJr (Apr–Jul 2025), I worked on chatbot development and evaluation pipelines, which strengthened my ability to build, test, and iterate quickly. I’m targeting Software Engineer roles—especially AI-adjacent—where I can apply solid CS fundamentals and ship reliable, user-facing features.

---

## Core intro

### Q1. Tell me about yourself.

I’m Ankit Sharma, a B.Tech Computer Science student at VIT Bhopal University (2027 batch, currently in 3rd year; CGPA 8.75/10). I focus on building end-to-end machine learning systems—from data preprocessing and model training to evaluation and deployment—across computer vision, predictive modeling, and practical GenAI applications. I’ve also worked as an AI Research Intern at CodingJr (Apr–Jul 2025), where I contributed to generative AI research, chatbot development, and evaluation pipelines.

### Q2. What roles are you targeting and why?

My priority is ML Engineer, followed by Data Scientist and AI Engineer. I enjoy the engineering side of ML: building reliable pipelines, improving model performance through disciplined evaluation, and converting prototypes into usable applications. My projects reflect that: measurable results (accuracy/AUC/RMSE), clear model comparisons, and deployment experience via Flask/Streamlit.

### Q3. What are your strongest technical areas?

- Computer Vision: CNNs, transfer learning, preprocessing pipelines (OpenCV).
- ML fundamentals: model selection, evaluation metrics, feature engineering, imbalanced-data handling.
- Deep Learning: training workflows, overfitting control (dropout, augmentation), and optimization.
- Deployment basics: Flask/Streamlit apps, practical hosting experience (Render/Vercel).
- Tools: TensorFlow/Keras, PyTorch, Git; AWS/Oracle Cloud exposure; currently deepening LangChain/RAG.

---

## Signature projects (deep dive)

### Q4. Walk me through your Brain Tumor Detection project.

Brain Tumor Detection is a multi-class MRI image classification system. I built both a custom CNN baseline and transfer learning variants (VGG16/ResNet50) with a preprocessing pipeline (resize, normalization, CLAHE enhancement). The best version achieved **96%+ test accuracy** and a weighted F1 of 0.94. I deployed it as a Flask web app for image upload and inference, which helped me think about usability and real-time inference constraints.

### Q5. What were the main challenges in Brain Tumor Detection, and how did you handle them?

Key challenges were generalization and avoiding overfitting. I used augmentation, regularization (dropout), and careful evaluation (confusion matrix and ROC curves) to ensure performance wasn’t inflated by easy patterns. I also used CLAHE to handle contrast variations in MRI scans, leading to the **96%+ accuracy** mark.

### Q6. Why did you use transfer learning (VGG16/ResNet50)?

MRI datasets can be limited compared to natural image datasets. Transfer learning provides robust feature extractors that help when labeled data is not huge. Fine-tuning allows adapting these features to the MRI domain while still benefiting from strong pretrained representations.

### Q7. Walk me through your Gait Recognition project.

Gait Recognition identifies individuals by walking patterns, which is challenging due to cross-view angles. I built a pipeline using **Xception** for spatial features and **LSTM** for temporal modeling. On the CASIA-B dataset, I achieved a peak accuracy of **98%**. This project is an ongoing research effort focusing on view-invariant robustness and temporal sequence modeling.

### Q8. Why is cross-view gait recognition hard?

Cross-view changes the visual appearance of the same person significantly, and clothing conditions further alter silhouettes. Models can overfit to view-specific cues. That’s why my evaluation separates same-view and cross-view performance to ensure the **98% accuracy** is robust.

### Q9. If you had more time, how would you improve Gait Recognition?

I would explore view-invariant representations, metric learning losses (contrastive/triplet), and stronger temporal modeling. I’d also strengthen the evaluation protocol and add error analysis by angle/clothing condition to see exactly where failures occur.

---

## ML fundamentals (interview standard)

### Q10. How do you choose the right metric?

It depends on the problem goal and class distribution. For balanced multi-class classification, accuracy and F1 are useful; for imbalanced binary classification, AUC-ROC, precision/recall, and F1 are more informative. For regression, RMSE and R² capture error magnitude and explained variance.

### Q11. How do you prevent data leakage?

I treat data splitting as part of the modeling design: define the unit of independence (e.g., patient-level for medical imaging), split before heavy transformations, and ensure preprocessing statistics are learned on the train set only. I also validate by checking for suspiciously high scores.

### Q12. How do you handle imbalanced data?

I combine: (1) correct metrics (F1/AUC), (2) class weights or sampling strategies like **SMOTE**, (3) threshold tuning, and (4) robust validation. In my churn project, SMOTE was critical to reaching an AUC of 0.95.

### Q13. How do you do error analysis?

I review confusion matrices, inspect misclassified examples, and look for systematic failure patterns. For regression, I inspect residuals vs. features and identify outliers to check if errors correlate with specific regimes like peak hours or weather.

---

## Additional projects (short pitch)

### Q14. Explain your Customer Churn project.

I built a churn classifier using an ensemble of **XGBoost and Logistic Regression**. I achieved an AUC-ROC of 0.95 and accuracy of 93.2%. I used SMOTE for imbalance and SHAP to identify that contract type and monthly charges were the top churn drivers, providing actionable insights for business stakeholders.

### Q15. Explain your Food Delivery Time Prediction project.

I developed a regression pipeline comparing XGBoost and Random Forest. XGBoost performed best with an **RMSE of 5.2 minutes** and an R² of 0.87. I focused on feature engineering (traffic, weather, distance) to justify the final model choice.

### Q16. Explain your Groq-powered chatbot project.

I built an ultra-fast streaming chatbot with model switching across Llama 3, Mixtral, and Gemma. The engineering focus was on **<300ms perceived latency** and UX, demonstrating my ability to integrate high-speed LLM APIs with Streamlit.

### Q17. Explain Heal-Bridge AI.

Heal-Bridge AI is a live healthcare platform featuring an AI symptom checker, appointment booking, and secure record uploads. It reflects product thinking and full-stack deployment (Flask/Streamlit/Render).

---

## RAG / GenAI

### Q18. What is RAG, and why use it?

RAG (Retrieval-Augmented Generation) retrieves relevant info from a knowledge base and injects it into the prompt. It reduces hallucinations and allows the assistant to answer questions strictly from my curated project documentation without retraining.

### Q19. Common failure modes in RAG and how you mitigate them?

- Weak retrieval: improve chunking and metadata.
- Poor context: add structure and source labels.
- Hallucination: strict instructions to answer only from context and provide citations.

### Q20. How would you evaluate a RAG bot?

I’d create a test set of recruiter questions and measure answer faithfulness (grounding) and retrieval precision (did the right doc get picked?).

---

## Behavioral (STAR-style)

### Q21. Describe a challenging problem you solved.

In the Brain Tumor project, preventing overfitting was tough. I addressed it with CLAHE enhancement, augmentation, and architecture comparison. The result was a stable **96%+ test accuracy** and a deployable web interface.

### Q22. Describe a time you learned something quickly.

During my internship at CodingJr, I had to ramp up on transformer/GenAI concepts and convert them into working evaluation pipelines within weeks by building experiments and iterating on failures.

### Q23. Strengths and weaknesses?

Strengths: Disciplined evaluation, end-to-end pipeline thinking, and deployment capability. Weakness: Over-optimizing early; I’m improving this by timeboxing experiments.

### Q24. Why should we hire you?

I bring practical ML engineering: measurable results (96% accuracy, 5.2 min RMSE), multiple end-to-end projects, and experience shipping live applications.

---

## Quick “one-liners”

### Q25. Your tech stack in one line?

Python, TensorFlow/Keras, PyTorch, Flask/Streamlit, Scikit-Learn, OpenCV, and Git; actively working with LangChain and RAG.

### Q26. What makes you different?

I combine measurable ML performance with practical deployment: I can build models, evaluate them correctly, and present them as usable products for users or stakeholders.
