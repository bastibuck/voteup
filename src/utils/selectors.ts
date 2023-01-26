export const publicGroupSelect = {
  id: true,
  name: true,
  description: true,
  items: {
    select: {
      createdAt: true,
      creator: true,
      id: true,
      text: true,
      votes: true,
    },
  },
};
