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

import { update, fetch } from '../../stores/carts/cartsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCartsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    customer: null,

    cart_items: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { carts } = useAppSelector((state) => state.carts);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof carts === 'object') {
      setInitialValues(carts);
    }
  }, [carts]);

  useEffect(() => {
    if (typeof carts === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = carts[el]));
      setInitialValues(newInitialVal);
    }
  }, [carts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/carts/carts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit carts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit carts'}
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
              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='CartItems' labelFor='cart_items'>
                <Field
                  name='cart_items'
                  id='cart_items'
                  component={SelectFieldMany}
                  options={initialValues.cart_items}
                  itemRef={'cart_items'}
                  showField={'product'}
                ></Field>
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
                  onClick={() => router.push('/carts/carts-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCartsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CARTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCartsPage;
