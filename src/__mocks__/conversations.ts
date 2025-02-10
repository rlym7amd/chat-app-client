export const conversations = [
  {
    id: 1,
    participants: [1, 2],
    messages: [
      {
        senderId: 1,
        text: "Hey Bob! How's it going?",
        timestamp: "2023-10-01T10:00:00Z",
      },
      {
        senderId: 2,
        text: "Hi Alice! I'm doing well, thanks! You?",
        timestamp: "2023-10-01T10:01:00Z",
      },
      {
        senderId: 1,
        text: "Just working on some projects. Want to catch up later?",
        timestamp: "2023-10-01T10:02:00Z",
      },
    ],
  },
  {
    id: 2,
    participants: [1, 3],
    messages: [
      {
        senderId: 1,
        text: "Hey Charlie! Are you free to chat?",
        timestamp: "2023-10-01T11:00:00Z",
      },
      {
        senderId: 3,
        text: "Hi Alice! Sure, what's up?",
        timestamp: "2023-10-01T11:01:00Z",
      },
      {
        senderId: 1,
        text: "I wanted to discuss our project timeline.",
        timestamp: "2023-10-01T11:02:00Z",
      },
    ],
  },
  {
    id: 3,
    participants: [2, 3],
    messages: [
      {
        senderId: 2,
        text: "Charlie, did you finish the report?",
        timestamp: "2023-10-01T12:00:00Z",
      },
      {
        senderId: 3,
        text: "Almost done! Just need to add a few more details.",
        timestamp: "2023-10-01T12:01:00Z",
      },
      {
        senderId: 2,
        text: "Great! Let me know if you need any help.",
        timestamp: "2023-10-01T12:02:00Z",
      },
    ],
  },
];
