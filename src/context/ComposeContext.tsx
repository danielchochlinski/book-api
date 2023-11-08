/* eslint-disable */
export default function Compose(props: any) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc: any, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
