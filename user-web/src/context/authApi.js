// ✅ SINGLE BASE URL FOR ENTIRE PROJECT
export const BASE_URL = "https://batteriesbazaar.com";

const getToken = () => localStorage.getItem("accessToken");

// REGISTER
// REGISTER
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/api/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    // Extract the first human-readable error message
    const message =
      result?.email?.[0] ||
      result?.phone_number?.[0] ||
      result?.username?.[0] ||
      result?.password?.[0] ||
      result?.detail ||
      Object.values(result).flat()[0] ||
      "Registration failed.";
    throw new Error(message);
  }
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


// ─── REFRESH TOKEN ────────────────────────────────────────────────────────────
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No refresh token");

  const response = await fetch(`${BASE_URL}/api/users/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Token refresh failed");

  localStorage.setItem("accessToken", result.access);
  return result.access;
};

// ─── FETCH WITH AUTO REFRESH ──────────────────────────────────────────────────
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, { ...options, headers });

  // If 401, try refresh once
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      response = await fetch(url, {
        ...options,
        headers: { ...headers, Authorization: `Bearer ${newToken}` },
      });
    } catch {
      // Refresh failed — logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
};
// ADD TO CART
// export const addToCart = async ({ productId, comboId, quantity = 1 }) => {
//   const token = localStorage.getItem("accessToken");

//   const body = comboId
//     ? { combo_product: comboId, quantity }
//     : { product: productId, quantity };

//   const response = await fetch(`${BASE_URL}/api/cart/items/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   });

//   const result = await response.json();

//   if (!response.ok) throw new Error(JSON.stringify(result));

//   return result;
// };

export const addToCart = async ({ productId, comboId, quantity = 1 }) => {
  const token = localStorage.getItem("accessToken");
 
  // ── Build body correctly — never send both, never send null ───────────────
  let body;
  if (comboId) {
    body = { combo_product: comboId, quantity };
  } else {
    body = { product: productId, quantity };
  }
 
  const response = await fetch(`${BASE_URL}/api/cart/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
 
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};
// CLEAR ENTIRE CART
export const clearCart = async () => {
  const data = await getCartItems();
  const items = data.results || data;
  await Promise.all(items.map((item) => deleteCartItem(item.id)));
};

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products/`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return result;
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

export const getComboProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products/combos/`);
  const result = await response.json();

  if (!response.ok) throw new Error("Failed to fetch combos");
  return result;
};
export const checkServiceAvailability = async (city) => {
  const response = await fetch(
    `${BASE_URL}/api/locations/service-availability/?city=${city}`
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Failed to check service");

  return result;
};

const handleBuyNow = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("Please login to buy!");
    navigate("/login");
    return;
  }

  try {
    // Add item to cart first
    await addToCart({
      productId: isCombo ? null : product.id,
      combo_product: isCombo ? product.id : null,
      quantity: 1,
    });

    // Then go to checkout
    navigate("/checkout");
  } catch (err) {
    alert("Failed to proceed to checkout");
  }
};


// ─── QUICK BATTERY FINDER ────────────────────────────────────────────────────


export const getMakes = async () => {
  const response = await fetch(`${BASE_URL}/api/products/makes/`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch makes");
  return Array.isArray(result) ? result : result.results || [];
};

export const getModels = async (makeId) => {
  const response = await fetch(`${BASE_URL}/api/products/models/?make_id=${makeId}`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch models");
  return Array.isArray(result) ? result : result.results || [];
};

export const getProductTypes = async () => {
  const response = await fetch(`${BASE_URL}/api/products/types/`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch product types");
  // Returns list of {id, name, slug} directly — no pagination
  return Array.isArray(result) ? result : Object.values(result);
};

export const getBrands = async () => {
  const response = await fetch(`${BASE_URL}/api/products/brands/`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch brands");
  // Returns list of {id, name, slug} directly — no pagination
return Array.isArray(result) ? result : result.results || [];
};;

export const getStates = async () => {
  const response = await fetch(`${BASE_URL}/api/locations/states/`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch states");
  return Array.isArray(result) ? result : result.results || [];
};

export const getCities = async (stateId) => {
  const response = await fetch(`${BASE_URL}/api/locations/cities/?state_id=${stateId}`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to fetch cities");
  return Array.isArray(result) ? result : result.results || [];
};
 
export const filterProducts = async ({ product_type, make_id, model_id, brand_id, state_id, city_id }) => {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries({ product_type, make_id, model_id, brand_id, state_id, city_id }).filter(([, v]) => v)
    )
  ).toString();
  const response = await fetch(`${BASE_URL}/api/products/filter/?${params}`);
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to filter products");
  return result;
};


// CREATE PAYMENT
export const createPayment = async (data) => {
  const response = await fetch(`${BASE_URL}/api/payments/`, {
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

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = async (paymentId) => {
  const response = await fetch(`${BASE_URL}/api/payments/${paymentId}/create_razorpay_order/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
};

export const getPayments = async () => {
  const response = await fetch(`${BASE_URL}/api/payments/`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to get payments");
  return result;
};