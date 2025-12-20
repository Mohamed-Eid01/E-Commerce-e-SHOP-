const BASE_URL = "http://localhost:8008/api";

// Helper للتحقق من التوكن
const getAuthHeaders = (token) => {
  const cleanToken = token?.trim();

  if (!cleanToken) {
    throw new Error("JWT token is missing or invalid");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cleanToken}`,
  };
};

// ===================== GET CART =====================
export const getCart = async (userId, token) => {
  try {
    if (!userId) throw new Error("UserId is missing");

    const res = await fetch(`${BASE_URL}/cart?userId=${userId}`, {
      method: "GET",
      headers: getAuthHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cart: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("getCart error:", err);
    throw err;
  }
};

// ===================== ADD TO CART =====================
export const addToCart = async (userId, token, product) => {
  try {
    if (!userId) throw new Error("UserId is missing");

    const res = await fetch(`${BASE_URL}/cart?userId=${userId}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error(`Failed to add item: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("addToCart error:", err);
    throw err;
  }
};

// ===================== UPDATE CART ITEM =====================
export const updateCartItem = async (userId, token, productId, quantity) => {
  try {
    if (!userId || !productId) {
      throw new Error("Missing userId or productId");
    }

    const res = await fetch(
      `${BASE_URL}/cart/item/${productId}?userId=${userId}`,
      {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ quantity }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to update item: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("updateCartItem error:", err);
    throw err;
  }
};

// ===================== REMOVE CART ITEM =====================
export const removeCartItem = async (userId, token, productId) => {
  try {
    if (!userId || !productId) {
      throw new Error("Missing userId or productId");
    }

    const res = await fetch(
      `${BASE_URL}/cart/item/${productId}?userId=${userId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(token),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to remove item: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("removeCartItem error:", err);
    throw err;
  }
};

// ===================== CLEAR CART =====================
export const clearCart = async (userId, token) => {
  try {
    if (!userId) throw new Error("UserId is missing");

    const res = await fetch(`${BASE_URL}/cart?userId=${userId}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`Failed to clear cart: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("clearCart error:", err);
    throw err;
  }
};
