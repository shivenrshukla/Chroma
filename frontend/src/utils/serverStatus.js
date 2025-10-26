// utils/serverStatus.js
export const checkFlaskServer = async () => {
  try {
    const response = await fetch('http://localhost:5000/health', {
      method: 'GET',
      timeout: 3000
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Add this health endpoint to your Flask app:
// @app.route('/health', methods=['GET'])
// def health_check():
//     return jsonify({"status": "healthy", "service": "ChromaGen AI"}), 200
