import { sql } from '../config/db.js'

const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`

    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('error fetching products:', error)
    res.status(500).send('Server error')
  }
}
const createProduct = async (req, res) => {
  const { name, description, image, price } = req.body
  if (!name || !description || !image || !price) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Please provide name, product, price and image'
      })
  }
  try {
    const newProduct =
      await sql`INSERT INTO products (name, description, image, price) VALUES (${name}, ${description}, ${image}, ${price}) RETURNING *`
    console.log('Successfully Created a new product')
    res.status(201).json({ success: true, data: newProduct[0] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
    console.log('error creating product', error)
  }
}
const getProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`
    res.status(200).json({ success: true, data: product[0] })
  } catch (error) {
    console.log('Error in get product function', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, image, price } = req.body
  try {
    const updateProduct = await sql`
        UPDATE products
        SET
       name = COALESCE(${name}, name),
       description = COALESCE(${description}, description),
       image = COALESCE(${image}, image),
       price = COALESCE(${price}, price)
        WHERE id = ${id} 
        RETURNING *`
    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res
      .status(200)
      .json({ message: 'Update successful', data: updateProduct[0] })
  } catch (error) {
    console.log('Error in update product function', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deleteProduct =
      await sql`DELETE FROM products WHERE id = ${id} RETURNING *`
    if (deleteProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    res
      .status(200)
      .json({ message: 'Product deleted successfully', data: deleteProduct[0] })
  } catch (error) {
    console.log('Error in delete product function', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
export {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
