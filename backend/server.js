const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const db = require('./models');
const cors = require('cors');

const app = express();
app.use(cors());  // fonksiyonu çağırarak middleware'ı ekleyin
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Uygulamaya Hosgeldiinn.' });
});


app.use('/api', routes);

app.use(errorHandler);



db.sequelize.sync({force: false}).then(() => {
    console.log('Database synced');
}).catch(err => {
    console.log('Error syncing database:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} bu portta çalisiyor`);
});