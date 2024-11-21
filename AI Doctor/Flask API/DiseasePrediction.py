import pandas as pd
import numpy as np
from joblib import load
import pickle
import warnings
warnings.filterwarnings('ignore')


class DiseasePrediction:
    def predict_disease(self, symptom_list):
        symptomfile = open('Symptom','rb')
        symptoms = pickle.load(symptomfile)

        # Set value to 1 for corresponding symptoms
        for s in symptom_list:
            symptoms[s] = 1

        # Put all data in a test dataset
        df_test = pd.DataFrame(columns=list(symptoms.keys()))
        df_test.loc[0] = np.array(list(symptoms.values()))

        # Load pre-trained model
        model = load(str("Disease-Prediction-ML.joblib"))
        result = model.predict(df_test)

        return result[0]
