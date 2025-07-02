const report = require('../models/reportModel');

exports.submitReport = async(req, res)=>{
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;

    try {
        const newReport = new report({
            ngoId,
            month,
            peopleHelped,
            eventsConducted,
            fundsUtilized
        });

        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting report', error });
    }
}

exports.getDashboardData = async (req, res) => {
  try {
    const { month } = req.query;
    const reports = await Report.find({ month });

    const summary = {
      totalNGOs: new Set(reports.map(r => r.ngoId)).size,
      totalPeople: reports.reduce((a, b) => a + b.peopleHelped, 0),
      totalEvents: reports.reduce((a, b) => a + b.eventsConducted, 0),
      totalFunds: reports.reduce((a, b) => a + b.fundsUtilized, 0)
    };

    res.send(summary);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching dashboard data' });
  }
};