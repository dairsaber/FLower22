import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenWidth} from '@/utils/constants';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';

// ! 暗号：明确状态归属，合理切分组件
interface InteractBoxProp {
  selectedIndex: number | undefined;
  onPress: (index: number) => void;
  index: number;
  isMultiply: boolean;
}

// 计算九宫格格子的尺寸
const size = (screenWidth - 20 * 2) / 3;

// 九宫格页面
export default function GridScreen() {
  const [isMultiply, setSelectMode] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<
    number | undefined
  >();

  // 单选状态下当格子被点击
  function onBoxPress(index: number) {
    if (selectedIndex === index) {
      reset();
    } else {
      setSelectedIndex(index);
    }
  }

  //重置单选状态下的格子状态
  function reset() {
    setSelectedIndex(undefined);
  }

  // 当选择模式变化时
  function onSelectModeChange(multiply: boolean) {
    reset();
    setSelectMode(multiply);
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>多选：</Text>
        <Switch value={isMultiply} onValueChange={onSelectModeChange} />
      </View>
      <View style={styles.boxContainer}>
        {new Array(9).fill(null).map((_, index) => (
          <InteractBox
            selectedIndex={selectedIndex}
            onPress={onBoxPress}
            index={index}
            key={index}
            isMultiply={isMultiply}
          />
        ))}
      </View>
    </View>
  );
}

// 可以交互的小方块组件
function InteractBox({
  selectedIndex,
  onPress,
  index,
  isMultiply,
}: InteractBoxProp) {
  const [isActive, setActive] = React.useState(false);
  // 根据选择mode清空激活状态
  React.useEffect(() => {
    setActive(false);
  }, [isMultiply]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (isMultiply) {
          setActive(!isActive);
        } else {
          onPress(index);
        }
      }}>
      {isMultiply ? (
        <View style={[styles.box, isActive && styles.active]} />
      ) : (
        <View style={[styles.box, selectedIndex === index && styles.active]} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  rowContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 4},
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: size,
    height: size,
    borderColor: '#000',
    borderWidth: 1,
  },
  active: {
    backgroundColor: 'green',
  },
});
