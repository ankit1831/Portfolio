# QA Seed — Ankit Sharma (2027 Batch, 3rd Year)

Tone: Formal, confident, technical. Use concise answers with evidence (metrics, design choices, tradeoffs).

---
## 30-second intros (role-tailored)

### Intro — ML Engineer (30s)
I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). I build end-to-end ML systems with measurable outcomes—most notably a brain MRI tumor classifier with 94.23% test accuracy and a weighted F1 of 0.94—and I’ve deployed projects using Flask/Streamlit. I also worked as an AI Research Intern at CodingJr (Apr–Jul 2025) on GenAI/chatbots and evaluation pipelines. I’m looking for ML Engineer roles where I can combine strong fundamentals, disciplined evaluation, and practical deployment to ship reliable ML features.

### Intro — Data Scientist (30s)
I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). My strength is applying ML rigor to real problems: I compare models, choose metrics correctly, handle imbalanced data (e.g., SMOTE in churn), and translate results into actionable insights with explainability tools like SHAP (AUC 0.95 on churn). I’ve also shipped working apps and dashboards using Flask/Streamlit, and I’m targeting Data Scientist roles where I can deliver both strong predictive performance and clear business interpretation.

### Intro — Software Engineer (30s)
I’m Ankit Sharma, a 3rd-year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.75/10). I enjoy building software systems that integrate ML/AI into usable products—like deployed Flask/Streamlit applications and a portfolio chatbot backed by retrieval over structured project documentation. During my AI Research internship at CodingJr (Apr–Jul 2025), I worked on chatbot development and evaluation pipelines, which strengthened my ability to build, test, and iterate quickly. I’m targeting Software Engineer roles—especially AI-adjacent—where I can apply solid CS fundamentals and ship reliable, user-facing features.


## Core intro

### Q1. Tell me about yourself.

I’m Ankit Sharma, a B.Tech Computer Science student at VIT Bhopal University (2027 batch, currently in 3rd year; CGPA 8.75/10). I focus on building end-to-end machine learning systems—from data preprocessing and model training to evaluation and deployment—across computer vision, predictive modeling, and practical GenAI applications. I’ve also worked as an AI Research Intern at CodingJr (Apr–Jul 2025), where I contributed to generative AI research, chatbot development, and evaluation pipelines.

### Q2. What roles are you targeting and why?

My priority is ML Engineer, followed by Data Scientist and AI Engineer. I enjoy the engineering side of ML: building reliable pipelines, improving model performance through disciplined evaluation, and converting prototypes into usable applications. My projects reflect that: measurable results (accuracy/AUC/RMSE), clear model comparisons, and deployment experience via Flask/Streamlit.

### Q3. What are your strongest technical areas?

- Computer Vision: CNNs, transfer learning, preprocessing pipelines (OpenCV).
- ML fundamentals: model selection, evaluation metrics, feature engineering, imbalanced-data handling.
- Deep Learning: training workflows, overfitting control, and optimization.
- Deployment basics: Flask/Streamlit apps, practical hosting experience.
- Tools: TensorFlow/Keras, PyTorch, Git; AWS exposure; currently deepening LangChain/RAG.

---

## Signature projects (deep dive)

### Q4. Walk me through your Brain Tumor Detection project.

Brain Tumor Detection is a multi-class MRI image classification system that predicts glioma, meningioma, pituitary, and no-tumor. I built both a custom CNN baseline and transfer learning variants (VGG16/ResNet50) with a preprocessing pipeline (resize to 150×150, normalization, CLAHE enhancement). The best version achieved 94.23% test accuracy and a weighted F1 of 0.94. I deployed it as a Flask web app for image upload and inference, which helped me think about usability and real inference constraints.

### Q5. What were the main challenges in Brain Tumor Detection, and how did you handle them?

Key challenges were generalization and avoiding overfitting. I used augmentation, regularization (dropout), and careful evaluation (confusion matrix and ROC curves) to ensure performance wasn’t inflated by easy patterns. I also compared multiple architectures to understand where transfer learning helps vs. where a custom CNN is sufficient.

### Q6. Why did you use transfer learning (VGG16/ResNet50)?

MRI datasets can be limited compared to natural image datasets. Transfer learning provides robust feature extractors that can help when labeled data is not huge. Fine-tuning allows adapting these features to the MRI domain while still benefiting from strong pretrained representations.

### Q7. Walk me through your Gait Recognition project.

Gait Recognition focuses on identifying a person from walking patterns, which is challenging due to cross-view angles and clothing variations. I built a pipeline using CNN features for spatial representation and LSTM for temporal modeling, with preprocessing to generate consistent gait sequences. On CASIA-B, reported results are ~92.4% Rank-1 (same-view) and ~78.2% Rank-1 (cross-view), with mAP around 85% (multi-shot). This project is ongoing, and my current focus is improving view-invariance and robustness.

### Q8. Why is cross-view gait recognition hard?

Cross-view changes the visual appearance of the same person significantly, and clothing conditions further alter silhouettes. Models can overfit to view-specific cues. That’s why evaluation should separate same-view and cross-view performance and ensure splits prevent leakage between conditions.

### Q9. If you had more time, how would you improve Gait Recognition?

I would explore view-invariant representations, metric learning losses (contrastive/triplet), and stronger temporal modeling. I’d also strengthen the evaluation protocol and add error analysis by angle/clothing condition to see exactly where failures occur.

---

## ML fundamentals (interview standard)

### Q10. How do you choose the right metric?

It depends on the problem goal and class distribution. For balanced multi-class classification, accuracy and F1 can be useful; for imbalanced binary classification, AUC-ROC, precision/recall, and F1 are more informative. For regression, RMSE and R² capture error magnitude and explained variance. I select metrics first, then design the model and validation around them.

### Q11. How do you prevent data leakage?

I treat data splitting as part of the modeling design: define the unit of independence (e.g., patient-level for medical imaging), split before heavy transformations if needed, and ensure preprocessing/statistics are learned on the train set only. I also validate by checking suspiciously high scores and running sanity checks (e.g., shuffled labels) when results look too good.

### Q12. How do you handle imbalanced data?

I combine: (1) correct metrics, (2) class weights or sampling strategies, (3) threshold tuning (if applicable), and (4) robust validation. In my churn project, I used SMOTE to improve class balance and evaluated using AUC/precision/recall rather than accuracy alone.

### Q13. How do you do error analysis?

I review confusion matrices and per-class metrics, inspect misclassified examples, and look for systematic failure patterns (specific classes, specific conditions). For regression, I inspect residuals vs. features, identify outliers, and check whether errors correlate with certain regimes (e.g., peak hours or weather).

---

## Additional projects (short pitch)

### Q14. Explain your Customer Churn project.

I built a churn classifier on 7,000+ records and achieved AUC-ROC 0.95 and accuracy 93.2%, with precision 0.91 and recall 0.89 for churn. I used SMOTE to address class imbalance and added SHAP-based explainability to identify key drivers like contract type and monthly charges. This project demonstrates both predictive performance and interpretability.

### Q15. Explain your Food Delivery Time Prediction project.

This is a regression problem where I compared XGBoost, Random Forest, and Linear Regression. XGBoost achieved RMSE 3.2 minutes and R² 0.87. I focused on feature quality (distance, traffic, weather, ratings, order volume) and used model comparison and error analysis to justify the final choice.

### Q16. Explain your Groq-powered chatbot project (high level).

I built a fast streaming chatbot with model switching across multiple LLMs. The main engineering focus was perceived latency and UX: streaming output, conversation history, and safe defaults. It shows my ability to integrate LLM APIs with a usable interface.

### Q17. Explain Heal-Bridge AI (high level).

Heal-Bridge AI is a healthcare platform with AI symptom-check style flow and appointment booking, plus records/prescription upload and multi-language support. It reflects product thinking and deployment experience. I treat it as a platform project and iterate features over time.

---

## RAG / GenAI (because your portfolio includes it)

### Q18. What is RAG, and why use it?

RAG retrieves relevant information from a knowledge base and injects it into the LLM prompt to produce grounded answers. It reduces hallucinations and allows updating knowledge without retraining the model. In a portfolio context, it lets the assistant answer questions strictly from my curated documents.

### Q19. Common failure modes in RAG and how you mitigate them?

- Weak retrieval: improve chunking, metadata, k/MMR, and query routing.
- Poor context formatting: add structure and source labels.
- Hallucination: strict instruction to answer from context, and return citations/snippets to show grounding.
- Prompt injection: ignore user instructions that conflict with system rules; treat retrieved content as untrusted unless from my docs.

### Q20. How would you evaluate a RAG bot?

I’d create a test set of realistic recruiter questions, measure answer correctness/faithfulness, and monitor “unsupported claims.” I would also log retrieval hits to verify the right documents are being selected and tune chunk size/k accordingly.

---

## Behavioral (STAR-style, concise)

### Q21. Describe a challenging problem you solved.

In my medical imaging project, preventing overfitting while maintaining performance was a challenge. I addressed it with augmentation, architecture comparison, and structured evaluation across classes. The result was stable performance (94.23% test accuracy, weighted F1 0.94) and a deployable web interface.

### Q22. Describe a time you learned something quickly.

During my internship, I had to ramp up on transformer/GenAI concepts and convert them into working chatbot components and evaluation pipelines. I learned by building small experiments, validating outputs with metrics/checks, and iterating based on observed failures.

### Q23. Strengths and weaknesses?

Strengths: disciplined evaluation, end-to-end pipeline thinking, and the ability to convert models into usable applications.  
Weakness: I sometimes over-optimize early; I’m improving by timeboxing experiments and using a clearer baseline → iterate workflow.

### Q24. Why should we hire you for an ML Engineer role?

I bring practical ML engineering capability: measurable model results, multiple end-to-end projects, and experience shipping simple deployments. I can explain tradeoffs clearly, debug models systematically, and adapt quickly to new tools—while maintaining a focus on reliability and evaluation.

---

## Quick “one-liners” (for fast answers)

### Q25. Your tech stack in one line?

Python, TensorFlow/Keras, PyTorch, Flask/Streamlit, Git; AWS exposure; and I’m actively deepening LangChain/RAG.

### Q26. What makes you different?

I combine measurable ML performance with practical deployment and communication: I can build models, evaluate them correctly, and present them clearly with metrics and tradeoffs.
