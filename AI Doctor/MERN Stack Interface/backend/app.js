const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const config = require("./config");
const auth = require("./models/authmodel");
const request = require("request");
const configStorage = require("./storage");

app.use(express.json());
app.use(cors((origin = ["http://localhost:5173"])));

(async () => {
  await configStorage.init();

  const requestPromise = (url) => {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  };

  const diseasePredict = async (data) => {
    console.log('2',data)
    let disease = [];
    const body = await requestPromise(
      `http://127.0.0.1:5000/disease_predict/${data}`
    );
    console.log(body);
    const predicted_disease = JSON.parse(body);
    disease.push(predicted_disease.data);
    return disease;
  };

  const symptomsPredict = async (data) => {
    let medication = [];
    console.log(data);
    const body = await requestPromise(
      `http://127.0.0.1:5000/symptoms_medication/${data}`
    );
    const predicted_medication = JSON.parse(body);
    for (let i = 0; i < predicted_medication.data.length; i++) {
      predicted_medication.data[i][0] = predicted_medication.data[i][0].replace(
        /#|_/g,
        " "
      );
    }
    console.log(predicted_medication);
    return predicted_medication.data;
  };

  const symptom_check = async (data) => {
    let symptoms = [];
    const body = await requestPromise(
      `http://127.0.0.1:5000/symptom_check/${data}`
    );
    const cleaning = JSON.parse(body);
    const correct_symptom = cleaning.data.map((data) => data[1]);
    return correct_symptom.toString();
  };
  const createToken = (id) => {
    return jwt.sign({ id }, "key", { expiresIn: "2d" });
  };

  const handleErrors = (err) => {
    console.log(err.message === "Incorrect Username");
    const errors = { email: "", password: "" };
    if (err.message === "Incorrect Username") {
      errors.email = err.message;
    }
    if (err.message === "Incorrect password") {
      errors.password = err.message;
    }
    return errors;
  };

  app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await auth.login(username, password);
      const token = createToken(user._id);
      res.json({ email: user.email, token: token });
    } catch (error) {
      const e = handleErrors(error);
      res.json({ error: e });
    }
  });

  app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const data = await auth.create({ username, email, password });
      const token = createToken(data._id);
      res.json({ token: token }).status(200);
    } catch (error) {
      const e = handleErrors(error);
      res.json({ error: e });
    }
  });

  app.post("/chats", async function (req, res) {
    const query = encodeURI(req.body.message.trim());
    console.log(query);
    let config = await configStorage.getConfig();
    request(
      `http://127.0.0.1:5000/chatbot/${query}`,
      async function (error, response, body) {
        const val = JSON.parse(body);

        if (val.data === "DiseaseInformation") {
          request(
            `http://127.0.0.1:5000/disease_detail/${query}`,
            function (error, response, body) {
              let infoData = JSON.parse(body);
              console.log(infoData);
              res.send({ data: infoData.data });
            }
          );
        } else if (val.data === "MedicineInformation") {
          request(
            `http://127.0.0.1:5000/medicine_detail/${query}`,
            function (error, response, body) {
              let infoData = JSON.parse(body);
              console.log(infoData);
              res.send({ data: infoData.data });
            }
          );
        } else if (
          val.data === "DiseaseSymptoms" &&
          config.other_symptoms.length === 0
        ) {
          let symptoms = [];
          let disease;
          request(
            `http://127.0.0.1:5000/symptom_check/${query}`,
            async function (error, response, body) {
              const data = JSON.parse(body);
              const length = data.data.length;
              for (let i = 0; i < length; i++) {
                if (data.data[i][1] !== null) {
                  symptoms.push(data.data[i][1]);
                  let save = data.data[i][1];
                  config.symptoms.push(save);
                }
              }
              symptoms = symptoms.toString();
              disease = await diseasePredict(symptoms);
              disease = disease.toString();
              config.disease = disease;
              request(
                `http://127.0.0.1:5000/other_symptom/${symptoms}/${disease}`,
                async function (error, response, body) {
                  let data = JSON.parse(body);
                  let clean_data = data.data.map((d, index) => d[0]);
                  config.other_symptoms = [...clean_data];
                  await configStorage.updateConfig(config);
                  let print_data = data.data.map((d, index) => d[1]);
                  res.json({ symptoms: print_data });
                }
              );
            }
          );
        } else if (
          val.data === "DiseaseSymptoms" &&
          config.other_symptoms.length != 0
        ) {
          const allDiseases = [...config.symptoms, ...config.other_symptoms];
          console.log(config);
          const symptoms = allDiseases.toString();
          const disease = await diseasePredict(symptoms);
          const medication = await symptomsPredict(symptoms);
          const del = await configStorage.resetConfig();
          disease.push(...medication);
          res.send({ data: disease });
          return;
        } else if (
          val.data == "NoSymptoms" &&
          config.other_symptoms.length != 0
        ) {
          const disease = await diseasePredict(config.symptoms.toString());
          const medication = await symptomsPredict(config.symptoms.toString());
          console.log(medication);
          const del = await configStorage.resetConfig();
          disease.push(...medication);
          console.log(disease);
          res.send({ data: disease });
          return;
        } else {
          const data = JSON.parse(body);
          console.log(data)
          res.send({ data:[data.data]});
        }
      }
    );
  });

  app.post("/reset-config", async (req, res) => {
    console.log(config)
    await configStorage.resetConfig();
    console.log(config)
    res.json({ message: "Config reset to default" });
  });

  const start = async () => {
    try {
      await mongoose.connect("mongodb://0.0.0.0:27017");
      app.listen(3000, () => {
        console.log("http://localhost:3000");
      });
    } catch (error) {
      console.log(error);
    }
  };

  start();
})();
