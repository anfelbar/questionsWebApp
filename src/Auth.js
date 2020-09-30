const Auth = {
  isAuthenticated: false,
  name: "",
  email: "",
  tokenId: "",

  authenticate() {
    this.isAuthenticated = true;
  },

  signout() {
    this.isAuthenticated = false;
  },

  getAuth() {
    //return true;
    return this.isAuthenticated;
  },

  getTokenId() {
    return this.tokenId;
  },

  setValues(name, email, tokenId) {
    this.email = email;
    this.name = name;
    this.tokenId = tokenId;
  },
};
export default Auth;
