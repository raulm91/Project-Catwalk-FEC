const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { API_KEY } = require('../config.js');

const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/';

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/src/components')));

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.listen(3000);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/', (req, res) => {
  res.sendStatus(201);
});

app.get('/reviews', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      page: req.query.page || 1,
      count: req.query.count || 5,
      sort: req.query.sort || 'helpful',
      product_id: req.query.product_id || 16056,
    },
  };
  axios.get(`${apiUrl}reviews/`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post('/reviews', (req, res) => {
  const dat = {
    rating: 5,
    summary: 'awsdasdasda',
    body: 'asdasdasdasdfasfas fasfsedgdr gdarg dragdr gdrdrgh ar',
    recommend: false,
    name: 'asddasdawsdaw',
    email: 'awdawd@ASdfasDF.egsfea',
    photos: [],
    characteristics: {
      Size: {
        id: 14,
        value: '4.0000',
      },
      Width: {
        id: 15,
        value: '3.5000',
      },
      Comfort: {
        id: 16,
        value: '4.0000',
      },
    },
  };

  axios.post(`${apiUrl}reviews/`, dat, {
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/reviews/report', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.put(`${apiUrl}reviews/${req.query.reviewId}/report`, req.query.reviewId, reviewHeader)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get('/reviews/helpfulness', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.put(`${apiUrl}reviews/${req.query.reviewId}/helpful`, req.query.reviewId, reviewHeader)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get('/productById', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      product_id: req.query.product_id || 16056,
    },
  };
  axios.get(`${apiUrl}products/${req.query.product_id}`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});
