const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/submitForm', (req, res) => {
    try {
        const { name, email, address, phoneNumber } = req.body;

        // Extend the validation to include address and phone number
        if (!name || !email || !address || !phoneNumber) {
            throw new Error('All fields are required.');
        }

        // Basic email format validation (further validation can be more complex)
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Invalid email format.');
        }

        // Prepare the CSV data including the new fields
        const csvData = `${name},${email},${address},${phoneNumber}\n`;

        // Append data to the CSV file
        fs.appendFileSync('formData.csv', csvData);

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error processing form:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
