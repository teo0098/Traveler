import * as SC from "./styledTagUsers";

const TagUsers: React.FC = ({ children }) => {
  return (
    <SC.StyledTagUsers>
      <SC.StyledText>
        Oznacz ludzi, z którymi ta wyprawa się odbyła
      </SC.StyledText>
      {children}
    </SC.StyledTagUsers>
  );
};

export default TagUsers;
