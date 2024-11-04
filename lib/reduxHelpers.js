export default function setCurrentPage(state, action) {
  const newPage = action.payload;

  // Handling forward page navigation
  if (state.currentPage < newPage) {
    if ((newPage - 1) % 4 === 0) {
      state.page += 1;
      state.temp = 1;
    } else {
      state.temp = ((newPage - 1) % 4) + 1;
    }
  }

  // Handling backward page navigation
  if (state.currentPage > newPage) {
    if (newPage % 4 === 0) {
      state.page -= 1;
      state.temp = 4;
    } else {
      state.temp = newPage % 4;
    }
  }

  // Update currentPage and calculate startPage
  state.currentPage = newPage;
  state.startPage = 8 * (state.temp - 1);
}
