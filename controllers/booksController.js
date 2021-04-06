const booksController = (Book) => {
  const getBooks = async (req, res) => {
    try {const { query } = req
    console.log('query: ', query)
      const response = await Book.find(query)

      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const postBook = async(req,res) => {
    try {const book = new Book(req.body)
      console.log ("body: ", req.body)
      await book.save()
  
      return res.status(201).json(book)
    }catch (error) {
      throw error
    }
  }
  const getBookById = async (req,res) => {
    try {
      const { params } = req
      const response = await Book.findById(params.bookId)

      res.json(response)
    }catch (error){
      throw error
    }
  }
  const updateBook = async(req,res) => {
    try{
      const { params, body } = req
      const response = await Book.updateOne({
        _id: params.bookId
        }, {
         $set: {
           title: body.title,
            genre: body.genre,
            author: body.author,
            read: body.read
        }
      }) 
    return res.status(202).json(response)
  } catch (error) {
    throw error
  }
    
  }
  const deleteBook = async(req,res) => {
    try{
      const{ params } = req
    console.log (params)
    await Book.findByIdAndDelete(params.bookId)
    return res.status(202).json({message:"El libro fue eliminado"})
    } catch (error) {
      throw error
    }
    
  }
  return {getBooks, postBook, getBookById, updateBook, deleteBook}
}

module.exports = booksController