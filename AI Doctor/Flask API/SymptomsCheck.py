from keras.models import load_model
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
import random
import warnings
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from textblob import Word
import itertools

warnings.filterwarnings('ignore')

class SymptomsCheck:
    
    def __init__(self,text):
        self.text=text.lower()

        self.lemmatizer = WordNetLemmatizer()
        self.model = load_model('Symptom_Model.h5')
        self.intents = json.loads(open('json Dataset\\SymptomsIntents.json').read())
        self.words = pickle.load(open('SymptomWords.pkl','rb'))
        self.classes = pickle.load(open('SymptomClasses.pkl','rb'))
        
    def spelling(self,a):
        word=Word(a)
        result = word.spellcheck()
        result = [i[0] for i in result]
        return result

    def clean(self):
        words = ['of','well','give','on','have','not','for','provide','feeling','days,',
                 'cure','to','around','i','you','few','am','please','been',
                 'help','like','can','i','me','a','and','suffering','from','the',
                 'me,','in','feel','experience','experiencing','dont','cant','cannot',
                 'when','during','having','mean','meant','actually','information','details',
                 'tell','something','about','what','know','do','define','on','is','give','can'
                 'provide']
        # removing multiple spaces
        self.text=" ".join(self.text.split())
        temp=self.text.split()
        for i in words:
            for j in temp:
                j=j.strip()
                if i==j:
                    temp.remove(i)
        
        self.text=" ".join(temp)

    def check_symptom(self,symptom):
        try:
            return self.chatbot_response(symptom)
        except:
            return None

    def check(self):
        self.clean()
        UserSymptomList = self.text.split(',')
        UserSymptomList = [i.strip() for i in UserSymptomList]
        SymptomClassList = []

        for i in UserSymptomList:
            res = self.check_symptom(i)
            if res==None:
                temp_list = i.split()
                temp_list = [i.lower() for i in temp_list]
                correct_words = [self.spelling(x) for x in temp_list]
                combinations = list(itertools.product(*correct_words))
                for x in combinations:
                    temp_txt = ' '.join(x)
                    temp_res = self.check_symptom(temp_txt)
                    if temp_res!=None:
                        res=temp_res
                        break

            SymptomClassList.append([i,res])
        
        return SymptomClassList

    def clean_up_sentence(self,sentence):

        # tokenize the pattern - split words into array

        sentence_words = nltk.word_tokenize(sentence)
        #print(sentence_words)
        # stem each word - create short form for word

        sentence_words = [self.lemmatizer.lemmatize(word.lower()) for word in sentence_words]
        #print(sentence_words)

        return sentence_words

    def bow(self,sentence, words, show_details=True):

    # tokenize the pattern

        sentence_words = self.clean_up_sentence(sentence)
        #print(sentence_words)

        # bag of words - matrix of N words, vocabulary matrix

        bag = [0]*len(words) 
        #print(bag)

        for s in sentence_words:  
            for i,w in enumerate(words):
                if w == s: 
                    # assign 1 if current word is in the vocabulary position
                    bag[i] = 1
                    if show_details:
                        print ("found in bag: %s" % w)
                    #print ("found in bag: %s" % w)
        #print(bag)
        return(np.array(bag))

    def predict_class(self,sentence, model):

        # filter out predictions below a threshold

        p = self.bow(sentence, self.words,show_details=False)
        #print(p)

        res = model.predict(np.array([p]))[0]
        #print(res)

        ERROR_THRESHOLD = 0.25

        results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
        # print(results)
        # sort by strength of probability

        results.sort(key=lambda x: x[1], reverse=True)
        # print(results)

        return_list = []

        for r in results:
            return_list.append({"intent": self.classes[r[0]], "probability": str(r[1])})

        return return_list
        #print(return_list)

    def getResponse(self,ints, intents_json):

        tag = ints[0]['intent']
        #print(tag)

        list_of_intents = intents_json['intents']
        #print(list_of_intents)

        for i in list_of_intents:
            if(i['tag']== tag):
                result = random.choice(i['responses'])
                break
        return result

    def chatbot_response(self,text): 
        ints = self.predict_class(text, self.model)
        #print(ints)
        res = self.getResponse(ints, self.intents)
        #print(res)
        return res
        
class OtherSymptoms:
    def __init__(self,symptom_list,predicted_disease):
        self.symptom_list=symptom_list
        self.predicted_disease=predicted_disease
        self.intents = json.loads(open('json Dataset\\IndividualDiseaseSymptoms.json').read())

    def give_other_symptoms(self):
        all_symptoms = self.intents[self.predicted_disease]
        other_symptoms = []
        for i,j in all_symptoms.items():
            if i not in self.symptom_list:
                other_symptoms.append([i,j])

        return other_symptoms