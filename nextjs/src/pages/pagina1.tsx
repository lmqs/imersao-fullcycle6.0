// @flow 
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
type Props = {
  name: string;
};
const Pagina1Page: NextPage<Props> = (props) => {
  return (
    <div>
      Hello World! {props.name}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      name: 'Full Cycle'
    }
  }
}
export default Pagina1Page;