export const publicGroupSelect = {
  groupId: true,
  name: true,
  description: true,
  createdAt: true,
  items: {
    select: {
      id: true,
      createdAt: true,
      creator: true,
      text: true,
      votes: true,
    },
  },
};
