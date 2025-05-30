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

import { update, fetch } from '../../stores/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProductsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    description: '',

    price: '',

    stock: '',

    images: [],

    categories: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { products } = useAppSelector((state) => state.products);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof products === 'object') {
      setInitialValues(products);
    }
  }, [products]);

  useEffect(() => {
    if (typeof products === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = products[el]));
      setInitialValues(newInitialVal);
    }
  }, [products]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/products/products-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit products'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Price'>
                <Field type='number' name='price' placeholder='Price' />
              </FormField>

              <FormField label='Stock'>
                <Field type='number' name='stock' placeholder='Stock' />
              </FormField>

              <FormField>
                <Field
                  label='Images'
                  color='info'
                  icon={mdiUpload}
                  path={'products/images'}
                  name='images'
                  id='images'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='Categories' labelFor='categories'>
                <Field
                  name='categories'
                  id='categories'
                  component={SelectFieldMany}
                  options={initialValues.categories}
                  itemRef={'categories'}
                  showField={'name'}
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
                  onClick={() => router.push('/products/products-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PRODUCTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditProductsPage;
