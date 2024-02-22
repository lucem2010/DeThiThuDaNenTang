import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

var apiLoai = 'https://65d5e85ef6967ba8e3bcec1b.mockapi.io/NhanVien';

const Item = ({ nv, updateList }) => {
  const [kiemTraHD, setKiemTraHD] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [UpdatemodalVisible, setUpdatemodalVisible] = useState(false);

  const [HinhAnh, setHinhAnh] = useState('');
  const [HoTen, setHoTen] = useState('');
  const [GioiTinh, setGioiTinh] = useState('');
  const [NgaySinh, setNgaySinh] = useState('');
  const [HopDong, setHopDong] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const UpdatetoggleModal = () => {
    setUpdatemodalVisible(!UpdatemodalVisible);
    console.log(UpdatemodalVisible);
    if (!UpdatemodalVisible) {
      setHinhAnh(nv.HinhAnh);
      setHoTen(nv.HoTen);
      setGioiTinh(nv.GioiTinh);
      setNgaySinh(nv.NgaySinh);
      setHopDong(kiemTraHD);
    } 
  };


  useEffect(() => {
    const hopDong = nv.HopDong;
    const loaiHopDong = hopDong ? 'Chính thức' : 'Thử việc';
    setKiemTraHD(loaiHopDong);
  }, [nv]);


  const checkNgayThangNS = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const checkThongTin = (ID) => {
    if (!HoTen || !GioiTinh || !NgaySinh || !HopDong || !HinhAnh) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
    } else if (GioiTinh.trim() !== 'Nam' && GioiTinh.trim() !== 'Nữ') {
      Alert.alert('Thông báo', 'Giới tính chỉ được nhập Nam hoặc Nữ');
    } else if (HopDong !== 'Chính thức' && HopDong !== 'Thử việc') {
      Alert.alert('Thông báo', 'Hợp đồng chỉ được nhập Chính thức hoặc Thử việc');
    } else if (!checkNgayThangNS(NgaySinh)) {
      Alert.alert('Thông báo', 'Ngày sinh không hợp lệ');
    } else {
      const hopDongValue = HopDong === 'Chính thức' ? false : true;

      const updatedNhanVien = {
        HoTen: HoTen,
        GioiTinh: GioiTinh,
        NgaySinh: NgaySinh,
        HopDong: hopDongValue,
        HinhAnh: HinhAnh,
      };

      // Hiển thị hộp thoại xác nhận cập nhật
      Alert.alert(
        'Xác nhận',
        'Bạn có muốn cập nhật thông tin nhân viên không?',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cập nhật bị hủy'),
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              // Gửi yêu cầu PUT đến API để cập nhật thông tin nhân viên dựa trên ID
              axios.put(`${apiLoai}/${ID}`, updatedNhanVien)
                .then(response => {
                  console.log('Thông tin nhân viên đã được cập nhật:', response.data);
                  // Cập nhật thành công, có thể thực hiện các hành động khác ở đây nếu cần  setHoTen('');
                  setGioiTinh('');
                  setNgaySinh('');
                  setHopDong('');
                  setHinhAnh('');
                  UpdatetoggleModal();
                  updateList();
                })
                .catch(error => {
                  console.error('Lỗi khi cập nhật thông tin nhân viên:', error);
                  // Xử lý lỗi nếu có
                });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleDelete = (nvId) => {
    // Hiển thị hộp thoại xác nhận xóa
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa nhân viên này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Xóa bị hủy'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            // Gửi yêu cầu DELETE đến API để xóa nhân viên dựa trên ID
            fetch(`${apiLoai}/${nvId}`, {
              method: 'DELETE'
            })
              .then(response => {
                console.log('Nhân viên đã được xóa thành công');
                updateList();
              })
              .catch(error => {
                console.error('Lỗi khi xóa nhân viên:', error);
                // Xử lý lỗi nếu có
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.khungItem}>
      <TouchableOpacity onPress={toggleModal}>
        <Image style={{ width: 90, height: 75 }} source={{ uri: nv.HinhAnh }} />
        <View style={styles.hoTenGioiTinh}>
          <Text>{nv.HoTen}</Text>
          <Text>{nv.GioiTinh}</Text>
        </View>
        <View style={styles.hoTenGioiTinh}>
          <Text>{kiemTraHD}</Text>
          <Text></Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", width: 160, justifyContent: "space-between" }}>
        <Button title='Sửa' onPress={UpdatetoggleModal}></Button>
        <Button title='Xóa' onPress={() => handleDelete(nv.id)}></Button>

      </View>
      <Modal
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Thông tin nhân viên </Text>
            <Image style={{ width: 200, height: 200 }} source={{ uri: nv.HinhAnh }} />
            <Text>Họ và tên:{nv.HoTen}</Text>
            <Text>Giới tính:{nv.GioiTinh}</Text>
            <Text>Trạng thái:{kiemTraHD}</Text>
            <Button title="Close" onPress={toggleModal} />

          </View>
        </View>
      </Modal>

      <Modal visible={UpdatemodalVisible}>
        <View style={styles.khungModal}>
          <View style={styles.modalADD}>
            <Text>Cập nhập nhân viên</Text>
            <TextInput style={styles.inputThem} placeholder='link ảnh' defaultValue={nv.HinhAnh}
              onChangeText={(txt) => setHinhAnh(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Họ và tên' defaultValue={nv.HoTen}
              onChangeText={(txt) => setHoTen(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='giới tính' defaultValue={nv.GioiTinh}
              onChangeText={(txt) => setGioiTinh(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Trạng thái ' defaultValue={kiemTraHD}
              onChangeText={(txt) => setHopDong(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Ngày sinh ' defaultValue={nv.NgaySinh}
              onChangeText={(txt) => setNgaySinh(txt)}></TextInput>

            <View style={styles.ADDnut}>
              <Button title='Cập nhập' onPress={() => checkThongTin(nv.id)}></Button>
              <Button title='Đóng' onPress={UpdatetoggleModal}></Button>
            </View>
          </View>
        </View>

      </Modal>

    </View>
  );

};

const manHinhHome = () => {
  const [dsLoai, setdsLoai] = useState([]);
  const [ADDmodalVisible, setADDmodalVisible] = useState(false);
  const [HinhAnh, setHinhAnh] = useState('');
  const [HoTen, setHoTen] = useState('');
  const [GioiTinh, setGioiTinh] = useState('');
  const [NgaySinh, setNgaySinh] = useState('');
  const [HopDong, setHopDong] = useState(false);
  const [CheckHopDong, setCheckHopDong] = useState('');


  const ADDtoggleModal = () => {
    setADDmodalVisible(!ADDmodalVisible);
  };


  const lay_dsLoai = async () => {
    try {
      let res = await fetch(apiLoai);
      let data = await res.json();
      setdsLoai(data);

    } catch (error) {

    }
  }

  useEffect(() => {
    lay_dsLoai();
  }, [lay_dsLoai]);

  const checkNgayThangNS = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const checkThongTin = () => {
    if (!HoTen || !GioiTinh || !NgaySinh || !CheckHopDong || !HinhAnh) {
      Alert.alert('Thông báo', 'vui lòng điền đầy đủ thông tin ');
    } else if (GioiTinh.trim() !== 'Nam' && GioiTinh.trim() !== 'Nữ') {
      Alert.alert('Thông báo', 'Giới tính chỉ được nhập Nam hoặc Nữ');
    } else if (CheckHopDong !== 'Chính thức' && CheckHopDong !== 'Thử việc') {
      Alert.alert('Thông báo', 'Hợp đồng chỉ được nhập Chính thức hoặc thử Thử việc');
    } else if (!checkNgayThangNS(NgaySinh)) {
      Alert.alert('Thông báo', 'Ngày sinh không hợp lệ');
    } else {
      CheckHopDong === 'Chính thức' ? setHopDong(false) : setHopDong(true)
      const NewNhanVien = {
        HoTen: HoTen,
        GioiTinh: GioiTinh,
        NgaySinh: NgaySinh,
        HopDong: HopDong,
        HinhAnh: HinhAnh,
      };
      axios.post('https://65d5e85ef6967ba8e3bcec1b.mockapi.io/NhanVien', NewNhanVien)
        .then(response => {
          setHoTen('');
          setGioiTinh('');
          setNgaySinh('');
          setHopDong('');
          setHinhAnh('');
          ADDtoggleModal();
        })
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dsLoai}
        renderItem={({ item }) => <Item nv={item} updateList={lay_dsLoai} />}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={ADDtoggleModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={ADDmodalVisible}>
        <View style={styles.khungModal}>
          <View style={styles.modalADD}>
            <Text>Thêm nhân viên</Text>
            <TextInput style={styles.inputThem} placeholder='link ảnh'
              onChangeText={(txt) => setHinhAnh(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Họ và tên'
              onChangeText={(txt) => setHoTen(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='giới tính'
              onChangeText={(txt) => setGioiTinh(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Trạng thái '
              onChangeText={(txt) => setCheckHopDong(txt)}></TextInput>

            <TextInput style={styles.inputThem} placeholder='Ngày sinh '
              onChangeText={(txt) => setNgaySinh(txt)}></TextInput>
            <View style={styles.ADDnut}>
              <Button title='Thêm' onPress={checkThongTin}></Button>
              <Button title='Đóng' onPress={ADDtoggleModal}></Button>
            </View>
          </View>
        </View>

      </Modal>
    </View>
  )
}

export default manHinhHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  khungItem: {
    width: 280,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    marginTop: 5,
    padding: 5
  },

  hoTenGioiTinh: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalADD: {
    width: 300,
    height: 350,
    backgroundColor: "#819830",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  inputThem: {
    width: 250,
    height: 60,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10
  },
  ADDnut: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: '100%',
    marginTop: 10
  },
  khungModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }


})