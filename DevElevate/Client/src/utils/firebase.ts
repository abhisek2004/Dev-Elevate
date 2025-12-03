// ⚠️ TEMPORARY BYPASS FOR CALENDAR DEV
// Simulates a logged-in user to bypass auth and avoid "White Screen"

const mockUser = {
  uid: "test-user-123",
  email: "developer@develevate.com",
  displayName: "Test Developer",
  photoURL: "https://via.placeholder.com/150",
  getIdToken: async () => "mock-token-123",
};

const auth = {
  currentUser: mockUser,
  onAuthStateChanged: (callback: any) => {
    // Immediately trigger callback with our mock user
    callback(mockUser);
    return () => {};
  },
  signOut: async () => {
    console.log("Mock signOut called");
    window.location.reload();
  },
} as any;

const provider = {} as any;

export { auth, provider };
