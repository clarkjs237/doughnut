import {
  EditablePreview,
  IconButton,
  ButtonGroup,
  Editable,
  Flex,
  EditableInput,
  EditableControls } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from 'react';



// export default function EditForm() {
//   /* Here's a custom control */
//   // function EditableControls() {
//   //   const {
//   //     isEditing,
//   //     getSubmitButtonProps,
//   //     getCancelButtonProps,
//   //     getEditButtonProps
//   //   } = useEditableControls();

//   //   return isEditing ? (
//     //   <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
//     //     <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
//     //     <IconButton
//     //       icon={<CloseIcon boxSize={3} />}
//     //       {...getCancelButtonProps()}
//     //     />
//     //   </ButtonGroup>
//     // ) : null;
//   // }

//   const [isEditing, setIsEditing] = useState(false);

//   function changer(e) {
//     console.log(e.target.value);
//     if (!isEditing) {
//       console.log('true')
//       setIsEditing(true);
//     } else {
//       setIsEditing(false);
//     }

//     return isEditing ? (
//       <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
//         <IconButton icon={<CheckIcon />} />
//         <IconButton
//           icon={<CloseIcon boxSize={3} />}
//         />
//       </ButtonGroup>
//     ) : null;
//   }

//   return (
//       <Editable
//         defaultValue="Rasengan ⚡️"
//         isPreviewFocusable={true}
//         selectAllOnFocus={false}
//       >
//         <Tooltip label="Click to edit">
//           <EditablePreview
//             py={2}
//             px={4}
//             _hover={{
//               background: useColorModeValue("gray.100", "gray.700")
//             }}
//           />
//         </Tooltip>
//         {/* <Input py={2} px={4} as={EditableInput} /> */}
//         <EditableInput onChange={(e) => changer(e)}/>
//       </Editable>
//   );
// }




export default function EditForm() {



  /* Here's a custom control */
  function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
    function tester(e) {
      console.log('submitted')
    }
    console.log(onSubmit)


    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} onClick={() => {console.log('clicked');}} />
        <IconButton icon={<CloseIcon />} onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <>
          <EditablePreview />
          <EditableInput />
          {/* <EditableControls {...props} /> */}
          <EditableControls {...props}/>
        </>
      )}
    </Editable>
  )
}