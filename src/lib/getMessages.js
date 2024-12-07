// export function withMessages(namespace) {
//     return async function getServerSideProps({ locale }) {
//       const messages = await import(`../messages/${locale}/${namespace}.js`).then((mod) => mod.default);
//       console.log(messages);
//       return {
//         props: {
//           messages: { [namespace]: messages },
//         },
//       };
//     };
//   }

export function withMessages(namespace) {
  return async function getServerSideProps({ locale }) {
    try {
      // Dynamically import the messages file based on locale and namespace
      const messages = await import(
        `../messages/${locale}/${namespace}.js`
      ).then((mod) => mod.default);
      console.log(`Loaded messages for namespace: ${namespace}`, messages);

      return {
        props: {
          messages: { [namespace]: messages },
        },
      };
    } catch (error) {
      console.error("Error loading messages:", error);

      // Provide a fallback if messages fail to load
      return {
        props: {
          messages: { [namespace]: {} },
        },
      };
    }
  };
}
