from flask import Flask, jsonify, request
from SymptomsCheck import SymptomsCheck,OtherSymptoms
from DiseasePrediction import DiseasePrediction
from SymptomsMedication import SymptomsMedication
from DiseaseDetails import DiseaseDetails
from MedicineDetails import MedicineDetails 
from AI_Doctor_Chatbot import chatbot_response

app = Flask(__name__) 

@app.route('/', methods = ['GET', 'POST']) 
def home(): 
	if(request.method == 'GET'): 
		data = "AI Doctor"
		return jsonify({'data': data}) 



@app.route('/chatbot/<string:query>', methods = ['GET']) 
def chatbot(query): 
	print(query)
	res=chatbot_response(query)
	print(res)
	return jsonify({'data': res}) 


@app.route('/symptom_check/<string:query>', methods = ['GET']) 
def symptom_check(query): 
	ob=SymptomsCheck(query)
	symptom_list=ob.check()
	return jsonify({'data': symptom_list}) 

@app.route('/other_symptom/<string:symptoms>/<string:disease>', methods = ['GET']) 
def other_symptom(symptoms, disease): 
	symptom_list=symptoms.split(",")
	ob=OtherSymptoms(symptom_list=symptom_list,predicted_disease=disease)
	other_symptoms=ob.give_other_symptoms()
	return jsonify({'data': other_symptoms}) 

@app.route('/disease_predict/<string:query>', methods = ['GET']) 
def disease_predict(query):
	symptom_list=query.split(",")
	diseaseObject = DiseasePrediction()
	disease = diseaseObject.predict_disease(symptom_list)
	return jsonify({'data': disease}) 


@app.route('/symptoms_medication/<string:query>', methods = ['GET']) 
def symptoms_medication(query):
	symptom_list=query.split(",")
	ob=SymptomsMedication(symptom_list)
	medications = ob.get_medications()  
	return jsonify({'data': medications}) 

@app.route('/disease_detail/<string:query>', methods = ['GET']) 
def disease_detail(query):
	ob=DiseaseDetails(query)
	disease_list=ob.check() 
	return jsonify({'data': disease_list}) 

@app.route('/medicine_detail/<string:query>', methods = ['GET']) 
def medicine_detail(query):
	ob=MedicineDetails(query)
	medicine=ob.check()
	return jsonify({'data': medicine}) 



if __name__ == '__main__': 
	app.run(debug = True) 
