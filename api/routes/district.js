const express = require('express');
const router =express.Router();
const mongoose = require("mongoose");
const Cases = require("../model/cases");
const Recovered= require("../model/recovered")
const Deaths= require("../model/deaths")

router.get('/summary',(req,res,next)=>{
    Cases.find()
    .select('count district')
    .exec()
    .then(docs => {
      Recovered.find()
      .select('count district')
      .exec()
      .then(doc=>{
        Deaths.find()
        .select('count district')
        .exec().then(fin=>{
          const response = {
           district:{cases:docs,
            recovered:doc,
            deaths:fin
          }}
          res.status(200).json(response);
     
        })
       })
      
      //   if (docs.length >= 0) {
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); 


})


router.post('/cases',(req,res,next)=>{
   console.log(req.body)
    const district = new Cases({
         count: req.body.count,
        district: req.body.district 
    });
    
      Cases
    .find({district:req.body.district})
    .exec()
    .then(result => {
      console.log(result)
      if(result.length>0){
        return res.status(404).json({
          message:"District already exists"
        });
     }
        district.save() 
        .then(data=>{
        res.status(201).json({
       message: "Created cases successfully",
       createdProduct: {
           count: data.count,
           district:data.district,
           request: {
               type: 'GET',
           }
       }
     });
   });
     
      })
 
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})
router.post('/recovered',(req,res,next)=>{
  console.log(req.body)
   const district = new Recovered({
        count: req.body.count,
       district: req.body.district 
   });
   
   Recovered
   .find({district:req.body.district})
   .exec()
   .then(result => {
    console.log(result)
    if(result.length>0){
      return res.status(404).json({
        message:"District already exists"
      });
   }
   district
   .save()
   .then(data => {
     res.status(201).json({
       message: "Created Recovered successfully",
       createdProduct: {
           count: data.count,
           district:data.district,
           request: {
               type: 'GET',
           }
       }
     });
   })})
   .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
})
router.post('/deaths',(req,res,next)=>{
  console.log(req.body)
   const district = new Deaths({
        count: req.body.count,
       district: req.body.district 
   });
   
   Deaths
   .find({district:req.body.district})
   .exec()
   .then(result => {
     console.log(result)
     if(result.length>0){
       return res.status(404).json({
         message:"District already exists"
       });
    }
       district.save() 
       .then(data=>{
       res.status(201).json({
      message: "Created cases successfully",
      createdProduct: {
          count: data.count,
          district:data.district,
          request: {
              type: 'GET',
          }
      }
    });
  });
    
     })
  .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
})

router.patch("/cases/:districtid", (req, res, next) => {
  const id = req.params.districtid;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Cases.update({ district: id }, { $set: {count:req.body.count} })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'District updated',
          request: {
              type: 'GET',
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/recovered/:districtid", (req, res, next) => {
  const id = req.params.districtid;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Recovered.update({ district: id }, { $set: {count:req.body.count} })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'District updated',
          request: {
              type: 'GET',
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/deaths/:districtid", (req, res, next) => {
  const id = req.params.districtid;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Deaths.update({ district: id }, { $set: {count:req.body.count} })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'District updated',
          request: {
              type: 'GET',
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.delete("/cases/:districtid", (req, res, next) => {
  Cases.remove({ district: req.params.districtid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Entry deleted",
        request: {
          type: "POST",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/recovered/:districtid", (req, res, next) => {
  Recovered.remove({ district: req.params.districtid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Entry deleted",
        request: {
          type: "POST",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/deaths/:districtid", (req, res, next) => {
  Deaths.remove({ district: req.params.districtid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Entry deleted",
        request: {
          type: "POST",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports=router;
