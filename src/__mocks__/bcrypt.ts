const bcrypt = {
      hashSync: jest.fn().mockReturnValue("hashedPassword"),
      compareSync: jest.fn().mockReturnValue(true),
};

export default bcrypt;
