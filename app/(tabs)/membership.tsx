import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader } from "@/components/Loader";
import { MembershipPlanList } from "@/components/MembershipPlan/MembershipPlanList";
import { BrandColors } from "@/constants/theme";
import { useMembershipPlans } from "@/hooks/use-membership-plans";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  scrollContent: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.white,
  },
});

const MembershipScreen = () => {
  const { data: plans, isLoading, refetch, isRefetching } = useMembershipPlans();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <MembershipPlanList title="Membership" plans={plans ?? []} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MembershipScreen;
