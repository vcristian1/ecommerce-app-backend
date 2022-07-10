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

router.post('/', async (req, res) => {
  // create a new category
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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
