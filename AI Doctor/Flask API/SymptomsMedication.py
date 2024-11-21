import json
import random

class SymptomsMedication:
    def __init__(self,symptoms_list):
        self.symptoms_list = symptoms_list
        with open("json Dataset\\SymptomMedication.json", 'r') as file:
            self.data = json.load(file)["intents"]

    def get_medications(self):
        medications = []
        for i in self.symptoms_list:
            for j in self.data:
                if j["tag"]==i:
                    medications.append([i,random.choice(j["response"])])
                    break


        return medications
    

# ob=SymptomsMedication(["skin_rash","headache","bloody_stool"])
# print(ob.get_medications())