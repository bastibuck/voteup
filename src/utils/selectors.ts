export const publicGroupSelect = {
  id: true,
  groupId: true,
  name: true,
  description: true,
  createdAt: true,
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
