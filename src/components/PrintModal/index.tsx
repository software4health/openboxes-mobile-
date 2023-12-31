import React, { useState } from 'react';
import { Image, Modal, Text, Pressable, View } from 'react-native';
import styles from './styles';
import { DispatchProps, Props } from './types';
import { printLabelAction } from '../../redux/actions/products';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import InputBox from '../InputBox';
import Button from '../../components/Button';
import showPopup from '../Popup';

function PrintModal(props: Props) {
  const [label, setLabel] = useState<any>('1');
  const handleClick = () => {
    const { printLabelAction, defaultBarcodeLabelUrl, product, type } = props;
    printLabelAction(
      {
        productId: product.id,
        type: type,
        barcodeId: defaultBarcodeLabelUrl.id
      },
      printLabelActionCallback
    );
    props.closeModal();
  };

  const printLabelActionCallback = (data: any) => {
    if (data?.error) {
      showPopup({
        title: 'Label printing failed',
        message: data.errorMessage
      });
    }
  };

  const onChangeLabel = (text: string) => {
    setLabel(text);
  };
  return (
    <Modal animationType="slide" transparent={props.printModalVisible} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.image} source={{ uri: props?.defaultBarcodeLabelUrl?.url }} />
          <InputBox
            value={label}
            disabled={false}
            editable={false}
            label={'Number of Labels'}
            onChange={onChangeLabel}
          />
          <View style={styles.bottom}>
            <Button title={'Print Label'} onPress={handleClick} />
          </View>
          <Pressable style={styles.buttonClose} onPress={props.closeModal}>
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state: RootState) => ({
  printModalVisible: state.productsReducer.printModalVisible
});

const mapDispatchToProps: DispatchProps = {
  printLabelAction
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintModal);
