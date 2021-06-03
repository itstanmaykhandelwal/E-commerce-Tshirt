const Category = require("../models/category")
 
exports.getCategoryById = (req,res,next,id) =>{
   
    Category.findById(id).exec((err, cate) => {
        if(err){
            return res.status(400).json({
                error:"Category not found in DataBase ☹️"
            })
        }
        req.category = cate;
        next();
    })

};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) =>{
        if(err) {
            return res.status(400).json({
                error:"Not able to save category in DataBase ☹️"
            })
        }
        res.json({category});
    })
}


exports.getCategory = (req,res) =>{
    return res.json(req.category);
}


exports.getAllCategory = (req,res) =>{
    Category.find().exec((err, categories) =>{
        if(err) {
            return res.status(400).json({
                error:"No Category Found ☹️"
            });
        }
        res.json(categories);
    })
}


exports.updateCategory = (req,res) =>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updateCategory) =>{
        if(err) {
            return res.status(400).json({
                error:"Failed to  Update Category ☹️"
            });
        }
        res.json(updateCategory);
    })
}

exports.removeCategory = (req,res) =>{
    const category = req.category;

    category.remove((err,category) =>{
        if(err) {
            return res.status(400).json({
                error:"Failed to Delete this Category ☹️"
            });
        }
        res.json({
            message:"Successfull deleted 👍"
        })
    })
}
