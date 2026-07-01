import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/components/Container/Container";
import { Loader } from "@/components/Loader";
import { MembershipPlanList } from "@/components/MembershipPlan/MembershipPlanList";
import { WebLayout } from "@/components/WebLayout/WebLayout";
import { BrandColors } from "@/constants/theme";
import { useMembershipPlans } from "@/hooks/use-membership-plans";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.white,
  },
});

const MembershipScreen = () => {
  const { data: plans, isLoading } = useMembershipPlans();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <WebLayout>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Container>
          <MembershipPlanList title="Membership" plans={plans ?? []} />
        </Container>
      </SafeAreaView>
    </WebLayout>
  );
};

export default MembershipScreen;
