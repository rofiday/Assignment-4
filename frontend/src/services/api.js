const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const json = await response.json();
    if (json.status === "error") throw new Error(json.message);
    return json;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
export const logout = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const json = await response.json();
    if (json.status === "error") throw new Error(json.message);
    return json;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const customerServiceApi = {
  getAllCustomer: async () => {
    try {
      const response = await fetch(`${API_URL}/customers`);
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  // ambil api untuk createCustomer
  createCustomer: async (customers) => {
    try {
      const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customers),
        credentials: "include",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  updateCustomerById: async (id, customers) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customers),
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  deleteCustomerById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};

export const userServiceApi = {
  getAllUser: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  createUser: async (users) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
        credentials: "include",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  updateUserById: async (id, users) => {
    try {
      console.log(id);
      console.log(users);
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);

      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  deleteUserById: async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
