import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/cart_items/cart_itemsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCart_items = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    product: null,

    quantity: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { cart_items } = useAppSelector((state) => state.cart_items);

  const { cart_itemsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: cart_itemsId }));
  }, [cart_itemsId]);

  useEffect(() => {
    if (typeof cart_items === 'object') {
      setInitialValues(cart_items);
    }
  }, [cart_items]);

  useEffect(() => {
    if (typeof cart_items === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = cart_items[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [cart_items]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: cart_itemsId, data }));
    await router.push('/cart_items/cart_items-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit cart_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit cart_items'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Product' labelFor='product'>
                <Field
                  name='product'
                  id='product'
                  component={SelectField}
                  options={initialValues.product}
                  itemRef={'products'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Quantity'>
                <Field type='number' name='quantity' placeholder='Quantity' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/cart_items/cart_items-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCart_items.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CART_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCart_items;
