const express = require('express');
const { createSegment, getSegments ,previewSize,deleteSegment} = require('../controllers/audienceController');

const router = express.Router();

// Route to create a new audience segment
router.post('/', createSegment);
// router.post('/', (req,res)=>{
//   res.send("Hehhllo");
// });

// Route to get all audience segments
router.get('/', getSegments);
router.post('/preview', previewSize); 
router.delete('/:id', deleteSegment);

module.exports = router;
