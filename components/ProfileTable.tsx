import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Images from '../assets/images';
import {Keys, Meta, Profile} from '../modules/profile/profile';
import glamColors from '../public/glamColors';

interface ProfileValue {
  name: string;
  value: any;
  isColumn?: boolean;
  isBlack?: boolean;
  isChangeable?: boolean;
  isDialog?: boolean;
  placeholder?: string;
  changeValue?: (name: string, value: any) => void;
  showModal?: boolean[];
  setShowModal?: (showModal: boolean[]) => void;
  metaData?: Keys[];
  setMetaData?: (metaData: Keys[]) => void;
  heightRange?: number[];
  setModalName?: (name: string | null) => void;
  modalName?: string;
  meta?: Meta;
  selectedData?: any;
}

interface ModalProps {
  showModal: boolean[];
  setShowModal: (showModal: boolean[]) => void;
  changeValue?: (name: string, value: any) => void;
  value: string | number;
  heightRange?: number[];
  setModalName?: (name: string | null) => void;
  modalName?: string;
  metaData?: Keys[];
  selectedData: any;
}

export function ProfileTable({data, meta}: Profile) {
  const [introduction, setIntroduction] = useState<string | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [school, setSchool] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean[]>([false, false, false]);
  const [heightRange, setHeightRange] = useState<number[]>([]);
  const [modalName, setModalName] = useState<string | null>(null);
  const [metaData, setMetaData] = useState<Keys[]>([]);
  const [selectedData, setSelectedData] = useState<any>([null, null, null]);

  useEffect(() => {
    if (data) {
      setIntroduction(data.introduction);
      setHeight(data.height);
      var bodyName = meta.body_types.filter(e => {
        if (e.key === data.body_type) {
          return e;
        }
      });
      var body = null;
      if (bodyName[0]) {
        body = bodyName[0].name;
      }
      setBodyType(body);
      setCompany(data.company);
      setJob(data.job);
      var educationName = meta.educations.filter(e => {
        if (e.key === data.education) {
          return e.name;
        }
      });
      var education = null;
      if (educationName[0]) {
        education = educationName[0].name;
      }
      setEducation(education);
      setSchool(data.school);
      generateRange(meta.height_range.min, meta.height_range.max);
      setSelectedData([data.height, body, education]);
    }
  }, [data]);

  function generateRange(start: number, end: number) {
    var length = end - start;
    var rangeList = new Array<number>(length);
    for (var i = 0; i < length; i++) {
      rangeList[i] = start + i + 1;
    }

    setHeightRange(rangeList);
  }

  function changeValue(name: string, value: any) {
    if (value === '') {
      value = null;
    }
    var height = selectedData[0];
    var body = selectedData[1];
    var education = selectedData[2];
    switch (name) {
      case '??????':
        setIntroduction(value);
        break;
      case '???':
        setHeight(value);
        height = value;
        setSelectedData([height, body, education]);
        break;
      case '??????':
        var bodyName = meta.body_types.filter(e => {
          if (e.key === value) {
            return e.name;
          }
        });
        body = bodyName[0].name;
        setBodyType(bodyName[0].name);
        setSelectedData([height, body, education]);
        break;
      case '??????':
        setCompany(value);
        break;
      case '??????':
        setJob(value);
        break;
      case '??????':
        var educationName = meta.educations.filter(e => {
          if (e.key === value) {
            return e.name;
          }
        });
        setEducation(educationName[0].name);
        education = educationName[0].name;
        setSelectedData([height, body, education]);
        break;
      case '??????':
        setSchool(value);
        break;
    }
    setShowModal([false, false, false]);
  }

  return (
    <View style={s.containerWrapper}>
      <ProfileRow name={'?????????'} value={data?.name ?? ''} />
      <ProfileRow
        name={'??????'}
        value={data?.gender == 'M' ? '??????' : '??????'}
        isBlack={true}
      />
      <ProfileRow name={'??????'} value={data?.birthday} />
      <ProfileRow name={'??????'} value={data?.location} />
      <View style={s.division} />
      <ProfileRow
        name={'??????'}
        value={introduction}
        isColumn={true}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'???????????? ????????? ???????????? ??????????????????'}
      />
      <View style={s.division} />
      <ProfileRow
        name={'???'}
        value={height}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        setModalName={setModalName}
        modalName={modalName!}
        showModal={showModal}
        placeholder={'??????????????????'}
        heightRange={heightRange}
        selectedData={selectedData}
      />
      <ProfileRow
        name={'??????'}
        value={bodyType}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        showModal={showModal}
        setModalName={setModalName}
        modalName={modalName!}
        placeholder={'??????????????????'}
        setMetaData={setMetaData}
        metaData={metaData}
        meta={meta}
        heightRange={heightRange}
        selectedData={selectedData}
      />
      <View style={s.division} />
      <ProfileRow
        name={'??????'}
        value={company}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'??????????????????'}
      />
      <ProfileRow
        name={'??????'}
        value={job}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'??????????????????'}
      />
      <ProfileRow
        name={'??????'}
        value={education}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        showModal={showModal}
        setModalName={setModalName}
        modalName={modalName!}
        placeholder={'??????????????????'}
        setMetaData={setMetaData}
        metaData={metaData}
        meta={meta}
        heightRange={heightRange}
        selectedData={selectedData}
      />
      <ProfileRow
        name={'??????'}
        value={school}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'??????????????????'}
      />
    </View>
  );
}

function ProfileRow({
  name,
  value,
  isColumn,
  isBlack,
  isChangeable,
  isDialog,
  placeholder,
  changeValue,
  showModal,
  setShowModal,
  heightRange,
  setModalName,
  modalName,
  metaData,
  meta,
  setMetaData,
  selectedData,
}: ProfileValue) {
  return (
    <View style={[s.tableWrapper, isColumn ? s.columnWrapper : s.rowWrapper]}>
      <Text
        style={[
          s.nameStyle,
          !isColumn ? {alignSelf: 'center'} : {height: 30, marginTop: 8},
        ]}>
        {name}
      </Text>
      {!isChangeable ? (
        <View style={s.valueStyle}>
          <Text
            style={[
              {
                color: isBlack ? glamColors.black : glamColors.Blue,
              },
              name === '?????????' && {
                width: 30,
              },
            ]}>
            {value}
          </Text>
          {name === '?????????' && (
            <FastImage
              source={Images.lock}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 14,
                height: 14,
                marginLeft: 8,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      ) : isDialog ? (
        <TouchableOpacity
          style={s.valueStyle}
          onPress={() => {
            switch (name) {
              case '???':
                setModalName!('???');
                setShowModal!([true, false, false]);
                break;
              case '??????':
                setMetaData!(meta?.body_types!);
                setModalName!('??????');
                setShowModal!([false, true, false]);
                break;
              case '??????':
                setMetaData!(meta?.educations!);
                setModalName!('??????');
                setShowModal!([false, false, true]);
                break;
              default:
                setModalName!(null);
                setShowModal!([false, false, false]);
                break;
            }
          }}>
          <Text style={{color: glamColors.Blue}}>{value ?? placeholder}</Text>
          {showModal && (
            <SelectDialog
              showModal={showModal!}
              setShowModal={setShowModal!}
              value={value}
              changeValue={changeValue!}
              heightRange={heightRange!}
              modalName={modalName}
              metaData={metaData}
              selectedData={selectedData}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TextInput
          style={[
            s.valueStyle,
            {width: '100%'},
            {color: value ? glamColors.Blue : glamColors.Gray2},
          ]}
          value={value}
          onChangeText={value => changeValue!(name, value)}
          placeholder={value ?? placeholder}
        />
      )}
      {isColumn && (
        <View
          style={{
            height: 30,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: glamColors.Gray4,
            }}>
            SNS ????????? ??? ????????? ?????? ??? ????????? ?????? ???????????????.
          </Text>
        </View>
      )}
    </View>
  );
}

function SelectDialog({
  showModal,
  setShowModal,
  changeValue,
  heightRange,
  modalName,
  metaData,
  selectedData,
}: ModalProps) {
  return (
    <Modal
      transparent={true}
      visible={showModal.includes(true)}
      onRequestClose={() => {
        setShowModal([false, false, false]);
      }}>
      <TouchableOpacity onPress={() => setShowModal([false, false, false])}>
        <View style={s.selectModal}>
          <View style={s.modalContent}>
            <View style={s.modalTitle}>
              <Text>{modalName}</Text>
            </View>
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 16,
              }}>
              {modalName === '???' &&
                heightRange?.map(e => {
                  return (
                    <TouchableOpacity
                      key={e}
                      style={s.modalValue}
                      onPress={() => changeValue!(modalName, e)}>
                      <Text
                        style={[
                          s.modalText,
                          selectedData[0] === e && {color: glamColors.Blue},
                        ]}>
                        {e}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              {modalName === '??????' &&
                metaData?.map((e: any, index: number): any => {
                  return (
                    <TouchableOpacity
                      key={e.key}
                      style={s.modalValue}
                      onPress={() => changeValue!(modalName, e.key)}>
                      <Text
                        style={[
                          s.modalText,
                          selectedData[1] === e.name && {
                            color: glamColors.Blue,
                          },
                        ]}>
                        {e.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

              {modalName === '??????' &&
                metaData?.map((e: any, index: number): any => {
                  return (
                    <TouchableOpacity
                      key={e.key}
                      style={s.modalValue}
                      onPress={() => changeValue!(modalName, e.key)}>
                      <Text
                        style={[
                          s.modalText,
                          selectedData[2] === e.name && {
                            color: glamColors.Blue,
                          },
                        ]}>
                        {e.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const s = StyleSheet.create({
  containerWrapper: {
    width: '100%',
  },
  tableWrapper: {
    width: '100%',
    paddingLeft: 16,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  columnWrapper: {
    flexDirection: 'column',
  },
  nameStyle: {
    width: '35%',
    fontSize: 16,
    color: glamColors.black,
  },
  valueStyle: {
    width: '65%',
    fontSize: 16,
    color: glamColors.Blue,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  division: {
    width: '100%',
    height: 1,
    backgroundColor: glamColors.Gray1,
  },
  selectModal: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    elevation: 20,
  },
  modalContent: {
    width: '80%',
    height: 412,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: glamColors.Gray2,
    borderBottomWidth: 1,
  },
  modalValue: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
  },
  modalText: {},
});
