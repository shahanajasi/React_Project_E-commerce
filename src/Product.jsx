import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">
            StyleWay
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link active text-primary"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-primary" href="#">
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-primary"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Girls
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Boys
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Gents
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ladies
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-center mb-4 text-primary">Our Products</h1>
            {error ? (
              <div className="alert alert-danger text-center shadow-sm">
                {error}
              </div>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          {product.title}
                        </h5>
                        <p className="card-text text-muted">${product.price}</p>
                        <p className="card-text small text-secondary">
                          {product.description}
                        </p>
                      </div>
                      <div className="card-footer text-center">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-4">
            <div className="sticky-top" style={{ top: "20px", zIndex: 1 }}>
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h4 className="text-center mb-0">Your Cart</h4>
                </div>
                <div className="card-body">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted">
                      Your cart is empty.
                    </p>
                  ) : (
                    <>
                      <ul className="list-group mb-3">
                        {cart.map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 className="mb-1 text-primary">
                                {item.title}
                              </h6>
                              <p className="mb-0 text-muted">
                                ${item.price.toFixed(2)} each
                              </p>
                              <div className="d-flex align-items-center mt-2">
                                <button
                                  className="btn btn-sm btn-outline-secondary me-2"
                                  onClick={() =>
                                    updateCartQuantity(item.id, -1)
                                  }
                                >
                                  -
                                </button>
                                <span className="fw-bold">{item.quantity}</span>
                                <button
                                  className="btn btn-sm btn-outline-secondary ms-2"
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <span className="text-primary fw-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-center">
                        <h5 className="text-primary">
                          Total: ${calculateTotalPrice()}
                        </h5>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
