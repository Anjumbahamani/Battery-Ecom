// ✅ SINGLE BASE URL FOR ENTIRE PROJECT
export const BASE_URL = "http://145.223.19.16";

const getToken = () => localStorage.getItem("accessToken");

// REGISTER
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/api/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Registration failed");
  return result;
};

// LOGIN
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/api/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Login failed");

  localStorage.setItem("accessToken", result.access);
  localStorage.setItem("refreshToken", result.refresh);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result;
};

// ADD TO CART
export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("accessToken");
  console.log("Token being sent:", token); // Debug
  
  const response = await fetch(`${BASE_URL}/api/cart/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ product: productId, quantity })
  });

  const text = await response.text();
  console.log("Cart API response:", text); // Debug
  
  try {
    const result = JSON.parse(text);
    if (!response.ok) throw new Error(JSON.stringify(result));
    return result;
  } catch {
    throw new Error("Server error: " + text.substring(0, 100));
  }
};

// GET CART ITEMS
export const getCartItems = async () => {
  const response = await fetch(`${BASE_URL}/api/cart/items/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get cart");
  return result;
};

// DELETE CART ITEM
export const deleteCartItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/api/cart/items/${itemId}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!response.ok) throw new Error("Failed to delete item");
  return true;
};

// APPLY COUPON
export const applyCoupon = async (code) => {
  const response = await fetch(`${BASE_URL}/api/cart/coupons/apply/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ code })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Invalid coupon");
  return result;
};

// GET ALL COUPONS
export const getCoupons = async () => {
  const response = await fetch(`${BASE_URL}/api/cart/coupons/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get coupons");
  return result;
};


// GET INSTALLATIONS
export const getInstallations = async () => {
  const response = await fetch(`${BASE_URL}/api/installations/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get installations");
  return result;
};
// CREATE ORDER
export const createOrder = async (data) => {
  const response = await fetch(`${BASE_URL}/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// GET ORDERS
export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/api/orders/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get orders");
  return result;
};

// CREATE INSTALLATION
export const createInstallation = async (data) => {
  const response = await fetch(`${BASE_URL}/api/installations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// ADD REVIEW
export const addReview = async (data) => {
  const response = await fetch(`${BASE_URL}/api/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// GET ALL REVIEWS
export const getReviews = async () => {
  const response = await fetch(`${BASE_URL}/api/reviews/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get reviews");
  return result;
}; 

// GET USER PROFILE
export const getUserProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await fetch(`${BASE_URL}/api/users/${user.id}/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get profile");
  return result;
};

// UPDATE USER PROFILE
export const updateUserProfile = async (id, data) => {
  const response = await fetch(`${BASE_URL}/api/users/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// GET ADDRESSES
export const getAddresses = async () => {
  const response = await fetch(`${BASE_URL}/api/users/addresses/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get addresses");
  return result;
};

// CREATE ADDRESS
export const createAddress = async (data) => {
  const response = await fetch(`${BASE_URL}/api/users/addresses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// DELETE ADDRESS
export const deleteAddress = async (id) => {
  const response = await fetch(`${BASE_URL}/api/users/addresses/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!response.ok) throw new Error("Failed to delete address");
  return true;
};

// ADD TO WISHLIST
export const addToWishlist = async (productId) => {
  const response = await fetch(`${BASE_URL}/api/users/wishlists/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ product: productId })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

// GET WISHLIST
export const getWishlist = async () => {
  const response = await fetch(`${BASE_URL}/api/users/wishlists/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get wishlist");
  return result;
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (id) => {
  const response = await fetch(`${BASE_URL}/api/users/wishlists/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  if (!response.ok) throw new Error("Failed to remove from wishlist");
  return true;
};