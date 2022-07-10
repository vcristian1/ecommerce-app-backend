const router = require('express').Router();
const { Tag, Product, ProductTag,} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        { 
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ]
    });
    if(!tagData) {
      res.status(404).json("404 Error! Tag could not be found by that ID")
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
