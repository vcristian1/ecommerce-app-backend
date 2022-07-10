const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ex: api/categories/1 endpoint
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!categoryData) {
      res.status(404).json({ message: '404 Error. No Category Found' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// api/categories endpoint 
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ex: api/categories/1 endpoint
router.put('/:id', async (req, res) => {
  //update category by its ID
  try {
    const categoryData = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!categoryData[0]) {
      res.status(404).json( {message: 'No category found with this id!'} );
      return;
    } res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ex: api/categories/1 endpoint
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: '404 Error! No Category can be found with this id!'});
      return;
    }
    res.status(200).json("The Category has been deleted!")
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
