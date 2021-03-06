export const parentVariants = {
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};

export const childVariants = {
  hidden: {
    opacity: 0,
    transform: "scale(0.5)",
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    transform: "scale(1)",
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};
