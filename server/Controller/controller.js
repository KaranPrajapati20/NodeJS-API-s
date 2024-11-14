const Product = require('../Models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const prod = new Product(req.body);
        await prod.save();
        res.status(200).json(prod);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while creating the product' });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' }); // Handle errors
    }
};



exports.getProducts = async (req, res) => {
    try {
        const filters = {};
        
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.name) {
            filters.name = req.query.name;
        }
        if (req.query.rating) {
            filters.rating = { $gte: req.query.rating };
        }
        if (req.query.price) {
            filters.price = { $lte: req.query.price }; 
        }
        if (req.query.sold) {
            filters.sold = { $gte: req.query.sold };
        }
        if (req.query.left) {
            filters.left = { $gte: req.query.left };
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};

// http://localhost:3003/api/v1/product/getproducts?category=Mobile&price=1000



exports.getProducts = async (req, res) => {
    try {
        const filters = {};

        if (req.query.minPrice && req.query.maxPrice) {
            filters.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts?minPrice=500&maxPrice=1000


exports.getProducts = async (req, res) => {
    try {
        const filters = {};

        if (req.query.categories) {
            const categoryList = req.query.categories.split(',');
            filters.category = { $in: categoryList };
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts?categories=Mobile,Laptop,Watch

exports.getProducts = async (req, res) => {
    try {
        const filters = {};
        let sort = {};

        if (req.query.sortBy) {
            const sortFields = req.query.sortBy.split(',');
            sortFields.forEach(field => {
                const [key, order] = field.split(':');
                sort[key] = order === 'desc' ? -1 : 1;
            });
        }

        const products = await Product.find(filters).sort(sort);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts?sortBy=price:asc,rating:desc

exports.getProducts = async (req, res) => {
    try {
        const filters = {};

        if (req.query.keyword) {
            filters.name = { $regex: req.query.keyword, $options: 'i' }; // 'i' makes it case-insensitive
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};


// http://localhost:3003/api/v1/product/getproducts?keyword=Watch

exports.getProducts = async (req, res) => {
    try {
        const filters = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find(filters).skip(skip).limit(limit);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts?page=2&limit=5

exports.getProducts = async (req, res) => {
    try {
        const filters = {};

        const total = await Product.countDocuments(filters);  // Total matching products
        res.status(200).json({ total });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts

exports.getProducts = async (req, res) => {
    try {
        const filters = {};

        if (req.query.category && req.query.maxPrice) {
            filters.category = req.query.category;
            filters.price = { $lte: req.query.maxPrice };
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// http://localhost:3003/api/v1/product/getproducts?category=Mobile&maxPrice=1000

exports.getAverageRating = async (req, res) => {
    try {
        const filters = {};

        if (req.query.category) {
            filters.category = req.query.category;
        }

        const result = await Product.aggregate([
            { $match: filters },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the average rating' });
    }
};
// http://localhost:3003/api/v1/product/averageRating?category=Mobile




exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ rating: 1 }); // 1 for ascending order
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};


exports.getMobileProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: 'mobile' }).sort({ rating: 1 }); // Filter by 'mobile' and sort by rating (ascending)
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};



exports.getMobileProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: 'mobile' })
            .sort({ rating: -1, price: 1 }); // Sort by rating (desc) and price (asc)
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};


exports.getMobileProducts = async (req, res) => {
    try {
        // Get query parameters
        const { sortRating, sortPrice } = req.query;

        // Build the sort object dynamically
        let sortCriteria = {};
        
        // Check if sortRating is provided in query (1 for ascending, -1 for descending)
        if (sortRating) {
            sortCriteria.rating = parseInt(sortRating);  // Expecting sortRating to be '1' (asc) or '-1' (desc)
        }

        // Check if sortPrice is provided in query (1 for ascending, -1 for descending)
        if (sortPrice) {
            sortCriteria.price = parseInt(sortPrice);  // Expecting sortPrice to be '1' (asc) or '-1' (desc)
        }

        // Fetch mobile products sorted by the criteria
        const products = await Product.find({ category: 'mobile' }).sort(sortCriteria);

        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};




exports.getProductsByCategory = async (req, res) => {
    try {
        // Get query parameters
        const { category, sortRating, sortPrice } = req.query;

        // Ensure category is provided
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        // Build the sort object dynamically
        let sortCriteria = {};
        
        // Check if sortRating is provided in query (1 for ascending, -1 for descending)
        if (sortRating) {
            sortCriteria.rating = parseInt(sortRating);  // Expecting sortRating to be '1' (asc) or '-1' (desc)
        }

        // Check if sortPrice is provided in query (1 for ascending, -1 for descending)
        if (sortPrice) {
            sortCriteria.price = parseInt(sortPrice);  // Expecting sortPrice to be '1' (asc) or '-1' (desc)
        }

        // Fetch products by category and sorted by the criteria
        const products = await Product.find({ category: category }).sort(sortCriteria);

        // If no products are found for the category
        if (!products.length) {
            return res.status(404).json({ message: `No products found for category ${category}` });
        }

        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching the products' });
    }
};
// GET http://localhost:3003/api/v1/product?category=mobile&sortRating=-1
// GET http://localhost:3003/api/v1/product?category=laptop&sortPrice=1

